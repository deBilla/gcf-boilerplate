import Joi from "joi";

export interface ModuleRequest {
  test_field: string;
}

export const bigqueryJobSchema = Joi.object<ModuleRequest>({
  test_field: Joi.string().required(),
});
