// load all data

const loadAllData = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await res.json();
    const universes = data.data.tools;
    displaySingleData(universes)
}

// display single data

const displaySingleData = (universes) => {
    const universeContainer = document.getElementById('universeContainer');
    universes.forEach(universe => {
        // console.log(universe);

        const universeContainerInnerDiv = document.createElement('div');
        universeContainerInnerDiv.classList.add('card', 'bg-base-100', 'shadow-xl');
        universeContainerInnerDiv.innerHTML = `
            <figure class="h-64 relative">
                <img class="h-full w-full" src="${universe?.image}" alt="universe-img" onerror="handleImageError(this)" />
                <p class =' absolute top-0 right-0 p-4 rounded-lg bg-orange-500 text-white'>${universe?.id}</p>
            </figure>

            <div class="card-body">
                <h2 class="card-title">${universe?.name}</h2>
                <ul>
                    ${universe?.features.map(feature => `<li class="list-disc">${feature}</li>`).join('')}
                </ul>
                
                <div class="flex justify-between items-center">
                    <div><span class="font-bold">Date: </span>${universe?.published_in}</div>
                    <div class="card-actions justify-end">
                        <button onclick = "handleClickDetails('${universe?.id}')" class="btn btn-primary h-6 min-h-6">Details</button>
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

const handleClickDetails = async (id) => {
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    shoWPhoneDetails(data.data)
}

const shoWPhoneDetails = (universe) => {
    console.log(universe);
    showDataDetailsModal.showModal();
    const showDetailsContainer = document.getElementById('showDetailsContainer');
    showDetailsContainer.innerHTML = `
       <div class = " flex justify-center">
            <img class = ' relative' src="${universe?.image_link[0]}" alt="">
            <p id="accuracy" class = 'absolute top-0 right-0 p-4 rounded-lg bg-orange-500 text-white'> ${universe?.accuracy?.score}% accuracy</p>
       </div>
        <h3 class='text-xl my-8'>Brand: ${universe?.tool_name}</h3>
        <div class = " flex justify-between"> 
            <div class = ""> <h3 class = 'text-xl'>Features</h3>
               <ul>
                    ${universe && universe.features
            ? Object.values(universe.features).map(feature => `<li>${feature?.feature_name || 'N/A'}</li>`).join('')
            : '<li>No features available</li>'}
                </ul>

            </div>

            <div class = ""> <h3 class = 'text-xl'>Integrations</h3>
                <ul>
                     ${universe?.integrations
            ? universe.integrations.map(integration => `<li class="list-disc">${integration}</li>`).join('')
            : '<li>No integrations found</li>'}
                </ul>

            </div>
            
        </div>
        <div class = ""> <h3 class = 'text-xl'>Input Output</h3>
                <ul>
                     ${universe?.input_output_examples
            ? universe.input_output_examples.map(input_output_example => `<li class="list-disc">${input_output_example?.input
                }</li>`).join('')
            : '<li>No integrations found</li>'}
                </ul>

        </div>
    <form method="dialog" class=' flex justify-end'>
        <button class="btn">Close</button>
    </form>
    `
    // if accuracy is not found then accuracy p will be hide
    const accuracyElement = document.getElementById('accuracy');

    // Check if universe?.accuracy?.score is available
    if (universe && universe.accuracy && universe.accuracy.score !== null) {
        // If available, set display to block
        accuracyElement.style.display = 'block';
    } else {
        // If not available, set display to none
        accuracyElement.style.display = 'none';
    }
}

loadAllData();

