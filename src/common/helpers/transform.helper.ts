export class TransformHelper {
  public static toLowerCase({ value }: { value: string }): string {
    return value ? value.toString().toLowerCase() : value;
  }

  public static trim({ value }: { value: string }): string {
    return value ? value.toString().toLowerCase() : value;
  }

  public static trimArray({ values }) {
    return Array.isArray(values) ? values.map((value) => value.trim()) : values;
  }

  public static uniqueItems({ value }) {
    return value ? Array.from(new Set(value)) : value;
  }

  public static toLowerCaseArray({ values }) {
    return Array.isArray(values)
      ? values.map((value) => value.toLowerCase())
      : values;
  }
}
