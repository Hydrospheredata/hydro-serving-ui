import { dataType } from '@shared/models/tensor-proto.model';

export const getFiledNameByTensorDataType = (type: number) => {
    switch (type) {
        case dataType.DT_FLOAT:
            return 'float_val';
        case dataType.DT_HALF:
            return 'half_val';
        case dataType.DT_DOUBLE:
            return 'double_val';
        case dataType.DT_INT32:
        case dataType.DT_INT16:
        case dataType.DT_INT8:
        case dataType.DT_UINT8:
            return 'int_val';
        case dataType.DT_UINT32:
            return 'uint32_val';
        case dataType.DT_UINT64:
            return 'uint64_val';
        case dataType.DT_STRING:
            return 'string_val';
        case dataType.DT_COMPLEX64:
            return 'complex_val';
        case dataType.DT_INT64:
            return 'int64_val';
        case dataType.DT_BOOL:
            return 'bool_val';
        case dataType.DT_COMPLEX128:
            return 'dcomplex_val';
        case dataType.DT_VARIANT:
            return 'variant_val';
    }
};
