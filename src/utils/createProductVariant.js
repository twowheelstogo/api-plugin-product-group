import ReactionError from "@reactioncommerce/reaction-error";
import { decodeProductOpaqueId } from "../xforms/id.js";
/**
 * @method createProductVariant
 * @summary - Create a product variant
 * @param context - an object containing the per-request state
 * @param input - Input arguments for the operation
 * @param input.variant - Product to add into Products
 * @param input.productId - Product ID linked to variant
 * @param input.shopId - the shop to create the product for
 * @return {String} created productId;
 */
export default async function createProductVariant(context, input) {
    const { variant, shopId, productId: opaqueProductId } = input;

    const productId = decodeProductOpaqueId(opaqueProductId);
    if (!variant) throw new ReactionError("missing-param", "product is required");

    if (!productId) throw new ReactionError("missing-param", "productId is required");

    const { data: { createProductVariant } } = await context.mutations.createProductVariant(context, {
        productId,
        shopId,
        variant
    });

    return { variant: createProductVariant };
}