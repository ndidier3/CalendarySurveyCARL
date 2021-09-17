function storeKeyForPast5Check(elemID, Key) {
    let dropdown = document.getElementById(elemID)
    let value = dropdown.value
    console.log(value)
    sessionStorage.setItem(Key, value)
    
}