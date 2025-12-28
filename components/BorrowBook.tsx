import React from 'react'

interface Props{
	bookId: string;
	userId: string;
	 borrowingEligibility: {
		isEligible: boolean;
		message: string;
	};
}

const BorrowBook = ({ userId, bookId, borrowingEligibility }: Props) => {
	return <div>BorrowBook</div>
}

export default BorrowBook
