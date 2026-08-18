async function get_albums() {

    const data = (await fetch("/api/albums"));
    const albums = await data.json();

    console.log(albums);
}



get_albums();
