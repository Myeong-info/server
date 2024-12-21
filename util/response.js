const successTrue = (status, message, data = null) => ({
    success: true,
    status,
    message,
    data,
});

const successFalse = (status, message, data = null) => ({
    success: false,
    status,
    message,
    data,
});

module.exports = {
    successTrue,
    successFalse,
};
