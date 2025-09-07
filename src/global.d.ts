interface GIObject {
  [key: string]: any;
}

interface GIPagination {
  page: number;
  pageSize: number;
  total?: number;
}
