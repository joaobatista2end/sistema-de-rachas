"use strict";
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
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const plugin_1 = __importDefault(require("../../database/mongose/plugin"));
const routes_1 = __importDefault(require("../routes"));
class FastifyServer {
    constructor() {
        this.server = (0, fastify_1.default)({ logger: true });
        this.server.register(routes_1.default);
        this.server.register(plugin_1.default, { timeout: 30000 });
        this.server.register(cors_1.default, {
            origin: true,
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.server.listen({ port: 8000, host: '0.0.0.0' });
                console.log('Servidor iniciado com sucesso!');
            }
            catch (err) {
                console.error(err);
                this.server.log.error(err);
                process.exit(1);
            }
        });
    }
}
exports.default = new FastifyServer();
