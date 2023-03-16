"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const id_validation_const_1 = require("./id-validation.const");
class IdValidationPipe {
    transform(value, metadata) {
        if (metadata.type != 'param') {
            return value;
        }
        if (!mongoose_1.Types.ObjectId.isValid(value)) {
            throw new common_1.HttpException(id_validation_const_1.ID_VALIDATION_ERROR, common_1.HttpStatus.BAD_REQUEST);
        }
        return value;
    }
}
exports.IdValidationPipe = IdValidationPipe;
//# sourceMappingURL=id-validation.pipe.js.map