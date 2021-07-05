import { gql } from "@apollo/client";
import React, { useCallback, useState } from "react";
import { ProductReviewFragment } from "./__generated__/product-review-fragment";

export const productReviewFragment = gql`
fragment ProductReviewFragment on Product {
    reviews {
        id
        commentBody
    }
}`;

type Props = {
    product: ProductReviewFragment;
    submitting: boolean;
    onSubmit: (comment: string) => Promise<void>;
};

export default function ProductReview({ product, submitting, onSubmit }: Props) {
    const [comment, setComment] = useState<string>("");
    const handleSubmitForm = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(comment);
        setComment("");
    }, [onSubmit, comment]);
    const handleChangeTextarea = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.currentTarget.value);
    }, [setComment]);

    return (
        <>
            <div>
                <h2>Reviews</h2>
                {product.reviews.length ? (
                    <ul>
                        {product.reviews.map(({ id, commentBody }) => (
                            <li key={id}>{commentBody}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews found.</p>
                )}
            </div>
            <form onSubmit={handleSubmitForm}>
                <div>
                    <label>
                        コメント
                        <textarea
                            value={comment}
                            onChange={handleChangeTextarea}
                        />
                    </label>
                </div>
                <button type="submit" disabled={submitting}>
                    追加
                </button>
            </form>
        </>
    );
}
