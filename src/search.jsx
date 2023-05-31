import React, { useState, useEffect } from 'react';

const Search = () => {
	const [data, setData] = useState([])
	const [query, setQuery] = useState('')

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		try {
			const response = await fetch(`/api/products`)
			const result = await response.json()
			setData(result)
		} catch (error) {
			console.error('Error fetching data:', error)
		}
	}

	const handleSearch = (event) => {
		setQuery(event.target.value)
	}

	const filterData = data.filter((item) =>
		item.name.toLowerCase().includes(query.toLowerCase()))

	return (
		<div>
			<input
				type="text"
				onChange={handleSearch}
			/>

			{filterData.map((item) => (
				<div key={item.id}>{item.name}</div>
			))}
		</div>
	)
}

export default Search