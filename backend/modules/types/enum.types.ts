import { registerEnumType } from "type-graphql/dist/decorators/enums";

export enum Sort {
  ASC = "asc",
  DESC = "desc",
}
registerEnumType(Sort, {
  name: "Sort",
});
