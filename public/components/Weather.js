"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
function Weather() {
    const [query, setQuery] = (0, react_1.useState)('');
    const [weather, setWeather] = (0, react_1.useState)({
        data: {},
        error: false,
        loading: false,
    });
    const toDate = () => {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        const currentDate = new Date();
        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
        return date;
    };
    const search = (event) => __awaiter(this, void 0, void 0, function* () {
        if (event.key === 'Enter') {
            event.preventDefault();
            setQuery('');
            setWeather(Object.assign(Object.assign({}, weather), { loading: true }));
            const url = 'https://api.openweathermap.org/data/2.5/weather';
            const appid = '43e1d367bdc6abb6d842293a4f4be90e';
            try {
                const response = yield axios_1.default.get(url, {
                    params: {
                        q: query,
                        units: 'metric',
                        appid: appid,
                    },
                });
                setWeather({ data: response.data, error: false, loading: false });
            }
            catch (error) {
                setWeather(Object.assign(Object.assign({}, weather), { data: {}, error: true }));
                setQuery('');
                console.log('error', error);
            }
        }
    });
    return (react_1.default.createElement("div", { className: "min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white" },
        react_1.default.createElement("h1", { className: "text-4xl mb-4" },
            "Weather App",
            react_1.default.createElement("span", null, "\uD83C\uDF24")),
        react_1.default.createElement("div", { className: "mb-6" },
            react_1.default.createElement("input", { type: "text", className: "px-4 py-2 border rounded-md bg-gray-800 text-white", placeholder: "Search City..", name: "query", value: query, onChange: (event) => setQuery(event.target.value), onKeyPress: search })),
        weather.error && (react_1.default.createElement("p", { className: "text-red-600 text-lg mb-4" }, "Sorry, City not found")),
        weather.data && weather.data.main && (react_1.default.createElement("div", { className: "text-center" },
            react_1.default.createElement("h2", { className: "text-2xl font-semibold mb-2" },
                weather.data.name,
                ", ",
                react_1.default.createElement("span", null, weather.data.sys.country)),
            react_1.default.createElement("div", { className: "mb-2" },
                react_1.default.createElement("span", null, toDate())),
            react_1.default.createElement("div", { className: "flex items-center justify-center mb-2" },
                react_1.default.createElement("img", { className: "w-16 h-16 mr-2", src: `https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`, alt: weather.data.weather[0].description }),
                react_1.default.createElement("span", { className: "text-4xl" },
                    Math.round(weather.data.main.temp),
                    react_1.default.createElement("sup", { className: "text-xl" }, "\u00B0C"))),
            react_1.default.createElement("div", { className: "mb-2" },
                react_1.default.createElement("p", null,
                    "Humidity: ",
                    weather.data.main.humidity,
                    "%")),
            react_1.default.createElement("div", null,
                react_1.default.createElement("p", { className: "capitalize mb-1" }, weather.data.weather[0].description),
                react_1.default.createElement("p", null,
                    "Wind Speed: ",
                    weather.data.wind.speed,
                    "m/s"))))));
}
exports.default = Weather;
