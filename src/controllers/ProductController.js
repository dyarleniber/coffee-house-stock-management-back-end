import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import {
  getAll,
  getCSV,
  create,
  get,
  update,
  updateQuantity,
  updateFile,
  destroy,
} from "../services/product";
import {
  missingProductsNotification,
  productRefilledNotification,
} from "../services/notification";
import { validationErrorResponse } from "../utils/response";
import { getImageValidation } from "../utils/validation";
import { getAuthTokenPayload } from "../utils/auth";

class ProductController {
  async index(req, res) {
    const page = parseInt(req.query?.page) > 0 ? parseInt(req.query.page) : 1;
    const filters = req.query;

    const schema = yup.object().shape({
      search: yup.string(),
    });

    try {
      await schema.validate(filters || {});
    } catch (error) {
      return validationErrorResponse(res, error);
    }

    const response = await getAll(page, filters);

    return res.status(StatusCodes.OK).json(response);
  }

  async download(req, res) {
    const csv = await getCSV();

    const fileName = `products-${Date.now()}.csv`;

    res.header("Content-Type", "text/csv");
    res.attachment(fileName);
    return res.send(csv);
  }

  async store(req, res) {
    const { body: data, file } = req;

    const schema = yup.object().shape({
      name: yup.string().required(),
      description: yup.string(),
      quantity: yup.number().required(),
      price: yup.number().required(),
      categoryId: yup.number().required(),
      file: getImageValidation().required("image is a required field"),
    });

    try {
      await schema.validate({ ...data, file } || {});
    } catch (error) {
      return validationErrorResponse(res, error);
    }

    const product = await create(data, file);

    await missingProductsNotification(data);

    return res.status(StatusCodes.OK).json(product);
  }

  async show(req, res) {
    const { id } = req.params;

    const product = await get(id);

    return res.status(StatusCodes.OK).json(product);
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    const schema = yup.object().shape({
      name: yup.string(),
      description: yup.string(),
      quantity: yup.number(),
      price: yup.number(),
      categoryId: yup.number(),
    });

    try {
      await schema.validate(data || {});
    } catch (error) {
      return validationErrorResponse(res, error);
    }

    const authTokenPayload = await getAuthTokenPayload(req);

    await update(id, data);

    await missingProductsNotification({ id, ...data });
    await productRefilledNotification({ id, ...data }, authTokenPayload);

    return res.status(StatusCodes.OK).end();
  }

  async updateQuantity(req, res) {
    const { id } = req.params;
    const { quantity } = req.body;

    const schema = yup.object().shape({
      quantity: yup.number().required(),
    });

    try {
      await schema.validate({ quantity } || {});
    } catch (error) {
      return validationErrorResponse(res, error);
    }

    const authTokenPayload = await getAuthTokenPayload(req);

    await updateQuantity(id, quantity);

    await missingProductsNotification({ id, quantity });
    await productRefilledNotification({ id, quantity }, authTokenPayload);

    return res.status(StatusCodes.OK).end();
  }

  async updateFile(req, res) {
    const { id } = req.params;
    const { file } = req;

    const schema = yup.object().shape({
      file: getImageValidation().required("image is a required field"),
    });

    try {
      await schema.validate({ file } || {});
    } catch (error) {
      return validationErrorResponse(res, error);
    }

    await updateFile(id, file);

    return res.status(StatusCodes.OK).end();
  }

  async destroy(req, res) {
    const { id } = req.params;

    await destroy(id);

    return res.status(StatusCodes.OK).end();
  }
}

export default new ProductController();
