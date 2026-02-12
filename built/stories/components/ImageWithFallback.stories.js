"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FallbackTriggered = exports.Default = void 0;
const image_fallback_1 = __importDefault(require("../../components/image-fallback"));
const meta = {
    title: 'Components/ImageWithFallback',
    component: image_fallback_1.default,
    argTypes: {
        src: {
            control: { type: 'text' },
            description: 'Primary image source',
        },
        fallbackSrc: {
            control: { type: 'text' },
            description: 'Fallback image source',
        },
        alt: {
            control: { type: 'text' },
            description: 'Alt text',
        },
    },
};
exports.default = meta;
const baseArgs = {
    src: 'https://via.placeholder.com/150',
    fallbackSrc: 'https://via.placeholder.com/150/000000/FFFFFF/?text=Fallback',
    alt: 'Test Image',
    width: 150,
    height: 150,
};
exports.Default = {
    args: baseArgs,
};
exports.FallbackTriggered = {
    args: Object.assign(Object.assign({}, baseArgs), { src: 'https://invalid-url.com/non-existent.jpg' }),
};
//# sourceMappingURL=ImageWithFallback.stories.js.map