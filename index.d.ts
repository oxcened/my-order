declare module '*.json' {
  const value: string;
  export = value;
}

declare module "*.svg" {
  const content: any;
  export default content;
}
