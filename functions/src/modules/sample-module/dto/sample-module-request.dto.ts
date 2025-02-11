import Joi from "joi";

export interface SampleModuleRequest {
  test_field: string;
}

export const bigqueryJobSchema = Joi.object<SampleModuleRequest>({
  test_field: Joi.string().required(),
});
