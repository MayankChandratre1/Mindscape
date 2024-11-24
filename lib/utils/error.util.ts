export const handleError = (type:string, message?:string) => {
    console.error(`###${type}: ${message || 'Something Went Wrong!'}`)
    return {error: message || 'Something Went Wrong!'}
}