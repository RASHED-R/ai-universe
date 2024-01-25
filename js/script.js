// load all data

const loadAllData = async () => {
    const res = await fetch(' https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const universes = data.data.tools;
    displaySingleData(universes)
}

// display single data

const displaySingleData = (universes) => {
    const universeContainer = document.getElementById('universeContainer');
    universes.forEach(universe => {
        console.log(universe);

        const universeContainerInnerDiv = document.createElement('div');
        universeContainerInnerDiv.classList.add('card', 'bg-base-100', 'shadow-xl');
        universeContainerInnerDiv.innerHTML = `
            <figure class="h-64">
                <img class="h-full w-full" src="${universe?.image}" alt="universe-img" onerror="handleImageError(this)" />
            </figure>

            <div class="card-body">
                <h2 class="card-title">${universe?.name}</h2>
                <ul>
                    <li class="list-disc">${universe?.features[0]}</li>
                    <li class="list-disc">${universe?.features[1]}</li>
                    <li class="list-disc">${universe?.features[2]}</li>
                </ul>
                <div class="flex justify-between items-center">
                    <div><span class="font-bold">Date: </span>${universe?.published_in}</div>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary h-6 min-h-6">Details</button>
                    </div>
                </div>
            </div>
        `;

        universeContainer.appendChild(universeContainerInnerDiv);
    });
}
// if image path is available  but img is not on that path then use this function
function handleImageError(imgElement) {
    // Replace the image source with a default or fallback image
    imgElement.src = "No_Image_Available.jpg";
    // You can also take alternative actions here, such as hiding the image or showing an error message.
}


loadAllData();
