const parseList = (response: string, is_title: boolean): string[] => {
    const items: any = []
    const rawItemsArray = response.split("\n")
    rawItemsArray.forEach((title) => {
        if (title.length > 0) {
            if (is_title) {
                items.push(titleCase(title.split(". ")[1]))
            } else {
                items.push(title.split(". ")[1])
            }
            
        }
    })
    return items
}

function titleCase(query: string) {
    var str = query.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }

    return str.join(' ');
}

export default parseList
