export interface IDataFilter {
  [key: string]: string[];
}

export interface IResultCard {
  imgUrl: string;
  title: string;
  miniTitle: string;
  description: string;
  site: string;
}

export interface ResponseData {
  records: Record[];
  offset: string;
}

export interface Record {
  id: string;
  createdTime: string;
  fields: Fields;
}

export interface Fields {
  "Mailing State": string;
  "Last Name": string;
  "Impact of locally owned"?: string;
  City?: string;
  "Mailing City": string;
  Description?: string;
  Employees: number;
  "Plan to stay locally owned"?: string;
  Email: string;
  State?: string;
  "How long have you been running your business?": number;
  Title: string;
  "Advise?"?: string;
  Name: string;
  Revenue?: string;
  "Clay Description"?: string;
  "Address 1"?: string;
  "Mailing Address 1": string;
  Website: string;
  "Why value local ownership?"?: string;
  ZIP?: number;
  Logo?: string;
  Industry: string;
  "First Name": string;
  "Mailing Country": string;
  "Mailing ZIP": number;
  Source?: string;
  "Date Created"?: string;
  CompanyPhone: string;
  CompanyAddress: string;
  "Hours per week"?: string;
  "Other Owners?"?: string;
  "When will you retire?"?: string;
  Age?: string;
  "Address 2"?: string;
  "Mailing Address 2"?: string;
  Phone?: string;
  "Ownership Structure"?: string;
  Campaign?: string;
  "Pledge Eligible"?: boolean;
  Nomination?: string;
  "Approved - Send Email"?: boolean;
  "Application Received "?: boolean;
  "Date Approved"?: string;
  Categories: string[],
  "Icons SVG (from Categories)": string[],
  "Icons Transparent (from Categories)": string[],
  "Icons with Background (from Categories)": string[]
}

export interface LocalBusiness {
  id: string;
  name: string;
  industry: string;
  companyAddress: string;
  companyPhone: string;
  description: string | undefined;
  email: string;
  website: string;
  logo: string | undefined;
  coverImage: string | undefined;
  lat: number;
  lang: number;
  Categories: string[],
  IconsSVG: string[],
  IconsTransparent: string[],
  IconsBackground: string[],
}
