'use client'

export default function BookFilters({
  books,
  onChange,
}: {
  books: any[]
  onChange: (b: any[]) => void
}) {
  return (
    <select
      onChange={e =>
        onChange(
          books.filter(b =>
            b.course.toLowerCase().includes(e.target.value)
          )
        )
      }
      className="border rounded-lg px-4 py-2"
    >
      <option value="">All</option>
      <option value="wafi">Al-Wafi</option>
      <option value="mufid">Al-Mufid</option>
    </select>
  )
}
