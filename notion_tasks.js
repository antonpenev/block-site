/* global window, document, URLSearchParams */

const NOTION_CONFIG = config.NOTION;

const makeNotionCall = async (endpoint, config = NOTION_CONFIG) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + config.SECRET);
  myHeaders.append("Notion-Version", config.VERSION);

  const requestOptions = { headers: myHeaders };

  const raw = await fetch(config.URL + endpoint, requestOptions);
  return raw.json();
};

const fetchPageTasks = async (blockId = NOTION_CONFIG.TODO_PAGE_BLOCK_ID) => {
  const rawResult = await makeNotionCall(`/blocks/${blockId}/children`);
  const tasks = rawResult.results
    .filter((block) => block.to_do && block.to_do.checked === false)
    .map((block) =>
      block.to_do.rich_text.map((lineElem) => lineElem.plain_text).join(" ")
    );
  return tasks;
};

const fetchMyTODOs = async () => {
  const tasks = await fetchPageTasks(NOTION_CONFIG.TODO_PAGE_BLOCK_ID);
  console.log("tasks", tasks);
  return tasks;
};

const getTasks = () => {
  document.getElementById("tasks").innerHTML = "Loading...";
  fetchMyTODOs().then((tasks) => {
    document.getElementById("tasks").innerHTML = tasks
      .map((task) => "<li>" + task + "</li>")
      .join("");
  });
};

document.getElementById("button-get-tasks").addEventListener("click", getTasks);
