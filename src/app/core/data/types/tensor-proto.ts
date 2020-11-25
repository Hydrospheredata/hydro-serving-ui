export enum dataType {
    // Not a legal value for DataType.  Used to indicate a DataType field
    // has not been set.
    DT_INVALID = 0,
    // Data types that all computation devices are expected to be
    // capable to support.
    DT_FLOAT = 1,
    DT_DOUBLE = 2,
    DT_INT32 = 3,
    DT_UINT8 = 4,
    DT_INT16 = 5,
    DT_INT8 = 6,
    DT_STRING = 7,
    DT_COMPLEX64 = 8, // Single-precision complex
    DT_INT64 = 9,
    DT_BOOL = 10,
    DT_QINT8 = 11, // Quantized int8
    DT_QUINT8 = 12, // Quantized uint8
    DT_QINT32 = 13, // Quantized int32
    DT_BFLOAT16 = 14, // Float32 truncated to 16 bits.  Only for cast ops.
    DT_QINT16 = 15, // Quantized int16
    DT_QUINT16 = 16, // Quantized uint16
    DT_UINT16 = 17,
    DT_COMPLEX128 = 18, // Double-precision complex
    DT_HALF = 19,
    DT_RESOURCE = 20,
    DT_VARIANT = 21, // Arbitrary C++ data types
    DT_UINT32 = 22,
    DT_UINT64 = 23,

    DT_MAP = 27, // Hydroserving map structure inside the tensor
}
