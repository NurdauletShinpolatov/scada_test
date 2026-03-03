import { Flex, Button, Text } from "@chakra-ui/react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  const maxVisiblePages = 5;

  const getVisiblePages = () => {
    const pages: number[] = [];

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start < maxVisiblePages - 1) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <Flex
      mt={6}
      justify="space-between"
      align="center"
      wrap="wrap"
      gap={3}
    >
      <Text color="gray.400" fontSize="sm">
        Page {currentPage} of {totalPages}
      </Text>

      <Flex gap={2}>
        <Button
          size="sm"
          variant="primary"
          onClick={() => onPageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Prev
        </Button>

        {visiblePages.map((page) => (
          <Button
            key={page}
            size="sm"
            variant="ghost"
            bg={page === currentPage ? "dark.300 !important" : "transparent"}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          size="sm"
          variant="primary"
          onClick={() => onPageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Flex>
    </Flex>
  );
}