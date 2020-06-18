const getErrorMessage = (error) => {
    let message = '';
    if (error.code) {
        switch (error.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(error);
                break;
            default:
                message = 'Something went wrong'
        }
    } else {
        for (let errName in error.errors) {
            if (error.errors[errName].message) {
                message = error.errors[errName].message;
            }
        }
    }
    return message;
}

const getUniqueErrorMessage = err => {
    let output;
    try {
        let fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2,
            err.message.lastIndexOf('_1')
        )
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists'
    } catch (ex) {
        output = 'Unique field already exists'
    }
    return output
}

export default {getErrorMessage};