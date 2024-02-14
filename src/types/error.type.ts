export type TErrorIssue = {
    path: string,
    message: string
};

export type TErrorResponse = {
    success: false,
    message: string,
    issue: TErrorIssue[],
    stack?: string
};