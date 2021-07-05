import { gql, useQuery } from "@apollo/client"
import { Link } from "react-router-dom";
import { ProductsQuery, ProductsQueryVariables } from "./__generated__/products-query";

const QUERY = gql`
query ProductsQuery {
    products {
        id
        name
    }
}`;

export default function Products() {
    const { data, loading, error } = useQuery<ProductsQuery, ProductsQueryVariables>(QUERY);
    if (error) return <p>{error.message}</p>;
    if (loading || !data) return <p>loading...</p>;
    return (
        <ul>
            {data.products.map(({ id, name }) => (
                <li key={id}>
                    <Link to={`/products/${id}`}>
                        {name}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
