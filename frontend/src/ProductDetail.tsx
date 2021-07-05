import React, { useCallback } from "react";
import { gql, useMutation, useQuery } from "@apollo/client"
import { useParams } from "react-router";
import { AddReviewMutation, AddReviewMutationVariables } from "./__generated__/add-review-mutation";
import { ProductDetailQuery, ProductDetailQueryVariables } from "./__generated__/product-detail-query";

import ProductReview, { productReviewFragment } from "./ProductReview";

const QUERY = gql`
${productReviewFragment}

query ProductDetailQuery ($id: ID!) {
    product(id: $id) {
        id
        name
        price
        description
        ...ProductReviewFragment
    }
}`;

const MUTATION = gql`
  mutation AddReviewMutation ($id: ID!, $commentBody: String!) {
    addReview (productId: $id, addReviewInput: { commentBody: $commentBody }) {
        id
    }
  }
`;

export default function ProductDetail() {
    const { productId } = useParams<{ readonly productId: string }>();
    const { data, loading, error, refetch } = useQuery<
        ProductDetailQuery,
        ProductDetailQueryVariables
    >(QUERY, {
        variables: {
            id: productId
        }
    });
    const [addReview, { loading: submitting }] = useMutation<
        AddReviewMutation,
        AddReviewMutationVariables
    >(MUTATION, {
        update(_, { data }) {
            if (!data?.addReview) return;
            refetch();
          }
    });
    const handleSubmitReview = useCallback(async (comment: string) => {
        addReview({
            variables: {
                id: productId,
                commentBody: comment
            }
        });
    }, [productId, addReview]);

    if (error) return <p>{error.message}</p>;
    if (loading) return <p>loading...</p>;
    if (!data?.product) return <p>product was not found.</p>;
    const { product } = data;
    return (
        <>
            <h1>{product.name} (¥{product.price})</h1>
            <p style={{ whiteSpace: "pre-wrap" }}>{product.description}</p>
            <ProductReview product={product} submitting={submitting} onSubmit={handleSubmitReview} />
        </>
    );
}
