'use client'

import { useState } from 'react'
import BookCard from './BookCard'
import BookFilters from './BookFilters'

export default function Bookshelf({ books }: { books: any[] }) {
  const [filtered, setFiltered] = useState(books)

  return (
    <>
      <BookFilters books={books} onChange={setFiltered} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {filtered.map(book => (
          <BookCard key={book.course} book={book} />
        ))}
      </div>
    </>
  )
}
