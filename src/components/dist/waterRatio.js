"use strict";
exports.__esModule = true;
var react_1 = require("react");
var material_1 = require("@mui/material");
var system_1 = require("@mui/system");
var Container = system_1.styled(material_1.Stack)({
    backgroundColor: "#D9D9D9",
    height: "100vh",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    color: "black"
});
var WaterRatio = function (_a) {
    var onWaterRatioChange = _a.onWaterRatioChange, coffeeWeight = _a.coffeeWeight;
    var _b = react_1.useState(0), waterLevel = _b[0], setWaterLevel = _b[1];
    var _c = react_1.useState(0), waveOffset = _c[0], setWaveOffset = _c[1];
    var _d = react_1.useState(false), isFlipped = _d[0], setIsFlipped = _d[1];
    var _e = react_1.useState(10), ratio = _e[0], setRatio = _e[1];
    var handleWaterLevelChange = function (event) {
        var newWater = parseInt(event.target.value, 10) || 0;
        setWaterLevel(newWater);
        var newRatio = newWater / coffeeWeight;
        setRatio(Math.round(newRatio));
    };
    var calculateWaterHeight = function () {
        // Assuming 500ml is the max height of the box
        var maxHeight = 100; // 20rem in pixels
        return (waterLevel / 400) * maxHeight;
    };
    var calculateTotalWater = function (event) {
        var newRatio = parseInt(event.target.value, 10) || 0;
        setRatio(newRatio);
        setWaterLevel(newRatio * coffeeWeight);
    };
    react_1.useEffect(function () {
        var interval = setInterval(function () {
            setWaveOffset(function (prevOffset) { return (prevOffset + 0.1) % 1; });
        }, 50);
        return function () { return clearInterval(interval); };
    }, []);
    var generateWavePoints = function () {
        var points = [];
        var width = 100;
        var maxHeight = 200; // Maximum height of the box in pixels
        var waterHeight = calculateWaterHeight();
        // Calculate a dynamic amplitude that decreases as water level rises
        var amplitude = 10 * (1 - waterHeight / maxHeight);
        for (var i = 0; i <= width; i++) {
            // Calculate the wave's y-coordinate
            var y = amplitude * Math.sin((waveOffset * 2 * Math.PI) + (i / width) * 4 * Math.PI);
            // Scale and shift the wave to fit within the water level
            y = (y + amplitude) * (waterHeight / maxHeight) + (100 - waterHeight);
            // Ensure y is within the bounds [0, 100]
            y = Math.max(0, Math.min(100, y));
            points.push(i + "% " + y + "%");
        }
        return points.join(", ");
    };
    var handleFlip = function () {
        setIsFlipped(!isFlipped);
    };
    return (react_1["default"].createElement(Container, { spacing: 2, alignItems: "center" },
        react_1["default"].createElement(material_1.Stack, null,
            react_1["default"].createElement(material_1.Typography, { variant: "h5", sx: { fontFamily: "Poppins" } },
                "How much ",
                react_1["default"].createElement("strong", null, "Water"),
                "?"),
            react_1["default"].createElement(material_1.Typography, { variant: "h5", align: "right", sx: { fontFamily: "Poppins", cursor: "pointer" }, onClick: handleFlip },
                "or ",
                react_1["default"].createElement("strong", null, "Ratio"),
                "?")),
        react_1["default"].createElement(material_1.Box, { onClick: function () {
                onWaterRatioChange(waterLevel, ratio);
            }, className: "glass", display: "flex", alignContent: "center", justifyContent: "center", height: "23rem", width: "20rem", padding: "5rem", sx: {
                position: "relative",
                zIndex: 1,
                overflow: "hidden",
                border: "1rem solid #ccc",
                borderRadius: "1rem",
                transition: "transform 0.8s",
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
            } },
            react_1["default"].createElement(material_1.Box, { sx: {
                    position: "absolute",
                    backfaceVisibility: "hidden",
                    backgroundColor: "lightblue",
                    height: calculateWaterHeight() + "%",
                    width: "100%",
                    bottom: 0,
                    transition: "height 0.5s ease",
                    clipPath: "polygon(0% 100%, " + generateWavePoints() + ", 100% 100%)"
                } }),
            react_1["default"].createElement(material_1.Box, { sx: {
                    position: "absolute",
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%"
                } },
                react_1["default"].createElement(material_1.FormControl, { variant: "standard", sx: { width: '4rem', '& .MuiInput-underline:before': { borderBottom: 'none' } } },
                    react_1["default"].createElement(material_1.Input, { inputProps: {
                            'aria-label': 'ratio',
                            style: { textAlign: 'center' }
                        } })))),
        isFlipped ? (
        // Ratio input (replace with your actual ratio input)
        react_1["default"].createElement(material_1.FormControl, { variant: "standard", sx: { width: '5rem', '& .MuiInput-underline:before': { borderBottom: 'none' } } },
            react_1["default"].createElement(material_1.Input, { value: ratio, onChange: calculateTotalWater, startAdornment: react_1["default"].createElement(material_1.InputAdornment, { position: "start" }, "1 : "), inputProps: {
                    'aria-label': 'weight',
                    style: { textAlign: 'center' }
                } }))) : (
        // Water input
        react_1["default"].createElement(material_1.Stack, { direction: "row", alignItems: "center", spacing: 2 },
            react_1["default"].createElement(material_1.Slider, { value: waterLevel, onChange: handleWaterLevelChange, min: 0, max: 400, step: 10, sx: { width: "13rem", color: "black" } }),
            react_1["default"].createElement(material_1.FormControl, { variant: "standard", sx: { width: '2rem', '& .MuiInput-underline:before': { borderBottom: 'none' } } },
                react_1["default"].createElement(material_1.Input, { value: waterLevel, onChange: handleWaterLevelChange, inputProps: {
                        'aria-label': 'weight',
                        style: { textAlign: 'center' }
                    } }))))));
};
exports["default"] = WaterRatio;
