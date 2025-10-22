type ApiResponse = {
    success: string;
    data: string;
    error: {
        code: string;
        message: string;
        status: number;
    }
}