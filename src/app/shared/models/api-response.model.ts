export interface GenericResponse<T> {
  data: T;
  meta: ResponseMeta;
  pagination?: Pagination;
}

export interface ResponseMeta {
  msg: string;
  status: number;
  response_id: string;
}

export interface Pagination {
  offset: number;
  total_number?: number;
  count: number;
  total_count: number;
}
