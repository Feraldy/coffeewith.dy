"use strict";
exports.__esModule = true;
var react_1 = require("react");
var material_1 = require("@mui/material");
var system_1 = require("@mui/system");
var cardRecipes = [
    { name: 'Tetsu Kasuya', recipeName: '4:6 Method', image: 'tetsuKasuya.webp', dripper: { name: 'V60', image: 'v60.png' }, description: "Tetsu Kasuya from Japan won the World Brewers Cup in 2016. He represented Coffee Factory in Ibaraki, Japan. Known for his 4:6 method" },
    { name: 'James Hoffmann', recipeName: 'A Better 1 Cup V60', image: 'jamesHoffmann.jpg', dripper: { name: 'V60', image: 'v60.png' }, description: "Tetsu Kasuya from Japan won the World Brewers Cup in 2016. He represented Coffee Factory in Ibaraki, Japan. Known for his 4:6 method" },
    { name: 'Scott Rao', recipeName: '4:6 Method', image: 'scottRao.jpg', dripper: { name: 'V60', image: 'v60.png' }, description: "Tetsu Kasuya from Japan won the World Brewers Cup in 2016. He represented Coffee Factory in Ibaraki, Japan. Known for his 4:6 method" },
    { name: 'My Recipe', recipeName: 'Me', image: 'custom.jpg', dripper: { name: '', image: '' }, description: "Tetsu Kasuya from Japan won the World Brewers Cup in 2016. He represented Coffee Factory in Ibaraki, Japan. Known for his 4:6 method" }
];
var Container = system_1.styled(system_1.Stack)({
    backgroundColor: '#D9D9D9',
    height: '100vh',
    justifyContent: 'center'
});
var CardItem = system_1.styled(material_1.Card)(function (_a) {
    var selected = _a.selected, visible = _a.visible;
    return ({
        width: selected ? '250px' : '200px',
        position: 'relative',
        filter: selected ? 'none' : 'blur(4px)',
        transition: 'filter 0.4s ease, transform 0.4s ease, opacity 0.4s ease',
        transform: selected ? 'scale(1.5)' : 'scale(0.5) translateX(${position * 50}px)',
        opacity: visible ? 1 : 0,
        display: visible ? 'flex' : 'none',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 10px',
        zIndex: selected ? 1 : 0
    });
});
var CardRecipeCarousel = function (_a) {
    var onRecipeSelect = _a.onRecipeSelect, onDripperSelect = _a.onDripperSelect, onWaterRatioChange = _a.onWaterRatioChange;
    var _b = react_1.useState(0), selectedIndex = _b[0], setSelectedIndex = _b[1]; // Start with V60 in the middle
    var handleClick = function (index) {
        setSelectedIndex(index);
        if (index === selectedIndex) {
            onRecipeSelect(cardRecipes[index]);
            if (cardRecipes[index].name !== 'My Recipe') {
                onDripperSelect(cardRecipes[index].dripper);
                onWaterRatioChange(1, 1);
            }
            else {
            }
        }
    };
    // Calculate the indexes to show based on the selectedIndex
    var displayedCard = [
        cardRecipes[(selectedIndex - 1 + cardRecipes.length) % cardRecipes.length],
        cardRecipes[selectedIndex],
        cardRecipes[(selectedIndex + 1) % cardRecipes.length],
    ];
    return (react_1["default"].createElement(Container, { spacing: 2, alignItems: "center" },
        react_1["default"].createElement(system_1.Stack, { spacing: 2, alignItems: "center", height: "100vh", justifyContent: "center", gap: "15px" },
            react_1["default"].createElement(material_1.Typography, { variant: "h4", style: { textAlign: 'center', color: 'black', fontFamily: 'Poppins' } },
                react_1["default"].createElement("span", { style: { fontWeight: 500 } }, "Which "),
                react_1["default"].createElement("strong", { style: { fontSize: '1.5em', fontWeight: 900, color: 'black' } }, "Recipe"),
                react_1["default"].createElement("span", { style: { fontWeight: 500 } }, " do you use?")),
            react_1["default"].createElement(material_1.Box, { display: "flex", justifyContent: "center", height: "400px" },
                " ",
                displayedCard.map(function (cardRecipe, index) { return (react_1["default"].createElement(system_1.Stack, { alignItems: "center", justifyContent: "center", key: cardRecipe.name },
                    react_1["default"].createElement(CardItem, { className: 'glass', selected: selectedIndex === (selectedIndex + index - 1 + cardRecipes.length) % cardRecipes.length, visible: true, onClick: function () { return handleClick((selectedIndex + index - 1 + cardRecipes.length) % cardRecipes.length); } },
                        react_1["default"].createElement(material_1.CardActionArea, null,
                            react_1["default"].createElement(material_1.CardMedia, { component: "img", height: "140", src: cardRecipe.image, sx: { objectFit: 'cover' } }),
                            react_1["default"].createElement(material_1.CardContent, { sx: {
                                    position: 'relative',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    color: 'black'
                                } },
                                react_1["default"].createElement(material_1.Typography, { gutterBottom: true, component: "div", style: { fontSize: '1rem', fontFamily: 'Poppins', fontWeight: 900 } }, cardRecipe.name),
                                react_1["default"].createElement(material_1.Typography, { variant: "body2", sx: { fontSize: '0.7rem', fontWeight: 100, fontFamily: 'Poppins' } }, cardRecipe.description)))))); })))));
};
exports["default"] = CardRecipeCarousel;
