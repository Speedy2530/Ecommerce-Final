import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, page, isAdmin = false, keyword='' }) => {
  return (
    pages > 1 && (
      <Pagination>
        {/* creates an array with [1, 2, ... n] pages */}
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={!isAdmin ? (keyword ? `/search/${keyword}/page/${x+1}` : `/page/${x + 1}`) : `/page/${x + 1}`}
          >
            {/* when you implement admin, change second to /admin/productlist/${x+1} */}
            <Pagination.Item active={x + 1 === page}>
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
