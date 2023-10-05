interface MESSAGE<DataT> {
  code: number;
  message?: string;
  data?: DataT;
}

export function SuccessMessage(data: unknown): MESSAGE<unknown> {
  return {
    code: 200,
    message: '操作成功！',
    data,
  };
}

export function NetErrorMessage(
  message: string,
  data: unknown
): MESSAGE<unknown> {
  return {
    code: 500,
    message,
    data,
  };
}
