// code for parsing input
const parseList = (response: string): string[] => {

    console.log('================================================================\n');
    console.log(response);
    console.log('================================================================\n');
    const items: any = []
    const rawItemsArray = response.split("\n")
    rawItemsArray.forEach((title) => {
        if (title.length > 0) {
            items.push(title.split(". ")[1])
        }
    })
    console.log(items);
    return items
}

export default parseList
