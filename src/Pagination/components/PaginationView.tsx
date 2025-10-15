export interface PaginationViewProps {
  currentPage: number;
  numOfPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const PaginationView = ({
  currentPage,
  numOfPages,
  setCurrentPage,
}: PaginationViewProps) => {
  const onClickPageNum = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  const onClickPrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const onClickNextPage = () => {
    setCurrentPage((prev) => (prev === numOfPages ? prev : prev + 1));
  };

  return (
    <div className="pagination-container">
      <button
        disabled={currentPage === 0}
        className="page-number"
        onClick={onClickPrevPage}
      >
        ◀️
      </button>
      {[...Array(numOfPages).keys()].map((i) => (
        <button
          className={`page-number ${
            currentPage === i ? "active-page-number" : ""
          }`}
          key={i}
          onClick={() => onClickPageNum(i)}
        >
          {i + 1}
        </button>
      ))}
      <button
        disabled={currentPage === numOfPages - 1}
        className="page-number"
        onClick={onClickNextPage}
      >
        ▶️
      </button>
    </div>
  );
};
