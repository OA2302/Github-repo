const BASE_URL = 'https://api.github.com';
const reposPerPage = 6;
const totalPages = 10;
let currentPage = 1;

const username = 'johnpapa'; 

// Function to fetch repositories from GitHub API
async function fetchRepositories(username, page, perPage) {
  const url = `${BASE_URL}/users/${username}/repos?page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Function to display repositories dynamically
function displayRepositories(repositories) {
  const repoContainer = document.querySelector('.repo');
  repoContainer.innerHTML = '';

  repositories.forEach(repo => {
    const repoCard = createRepoCard(repo);
    repoContainer.appendChild(repoCard);
  });
}

// Function to create a repository card
function createRepoCard(repo) {
  const repoCard = document.createElement('div');
  repoCard.className = 'repo-card';

  const projectName = document.createElement('h2');
  projectName.textContent = generateProjectName();

  const description = document.createElement('p');
  description.textContent = generateProjectDescription();

  const skillsContainer = document.createElement('div');
  skillsContainer.className = 'btn';

  // Display technologies or skills used
  const skills = generateSkills(repo);
  skills.forEach(skill => {
    const skillBtn = document.createElement('button');
    skillBtn.textContent = skill;
    skillsContainer.appendChild(skillBtn);
  });

  repoCard.appendChild(projectName);
  repoCard.appendChild(description);
  repoCard.appendChild(skillsContainer);

  return repoCard;
}

// Function to generate skills for a repository
function generateSkills(repo) {
  const skills = [];

  // Use repo language as the first skill
  if (repo.language) {
    skills.push(repo.language);
  }

  // Use repo topics as additional skills
  if (repo.topics) {
    const additionalSkills = repo.topics.slice(0, 2); // Adjust as needed
    skills.push(...additionalSkills);
  }

  // Ensure at least 3 skills, including common ones
  const commonSkills = [ 'Python', 'C++', 'C', 'C#'];
  for (let i = 0; i < commonSkills.length && skills.length < 3; i++) {
    if (!skills.includes(commonSkills[i])) {
      skills.push(commonSkills[i]);
    }
  }

  return skills;
}

// Function to generate a unique project name
function generateProjectName() {
  const prefixes = ['Awesome', 'Innovative', 'Dynamic', 'Epic', 'NextGen', 'Quantum', 'Futuristic', 'Profound'];
  const topics = ['Web', 'Mobile', 'AI', 'Blockchain', 'IoT', 'Data Science', 'AR/VR', 'Automation'];
  const suffixes = ['Explorer', 'Pioneer', 'Engine', 'Hub', 'Forge', 'Ninja', 'Crafter', 'Sprint'];

  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];
  const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  return `${randomPrefix} ${randomTopic} ${randomSuffix}`;
}

// Function to generate a unique project description
function generateProjectDescription() {
  const adjectives = ['Revolutionary', 'Sleek', 'Cutting-edge', 'Efficient', 'Intelligent', 'User-friendly', 'Scalable', 'Secure'];
  const actions = ['developing', 'creating', 'building', 'crafting', 'designing', 'engineering', 'shaping', 'innovating'];
  const targets = ['next-gen applications', 'smart solutions', 'innovative platforms', 'cutting-edge systems', 'user-friendly interfaces'];

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAction = actions[Math.floor(Math.random() * actions.length)];
  const randomTarget = targets[Math.floor(Math.random() * targets.length)];

  return `${randomAdjective} project ${randomAction} ${randomTarget}.`;
}

// Function to fetch and display repositories based on the current page
async function fetchAndDisplayRepositories(username, page) {
  try {
    const repositories = await fetchRepositories(username, page, reposPerPage);
    displayRepositories(repositories);
  } catch (error) {
    console.error(error);
  }
}

// Event listeners for pagination buttons
function handlePageClick(page) {
  currentPage = page;
  fetchAndDisplayRepositories(username, currentPage);
  updatePaginationButtons();
}

function updatePaginationButtons() {
  const paginationButtons = document.querySelectorAll('#pagination button');
  paginationButtons.forEach((button, index) => {
    button.classList.toggle('active', currentPage === index + 1);
  });
}

document.getElementById('prevPageBtn').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    handlePageClick(currentPage);
  }
});

document.getElementById('nextPageBtn').addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    handlePageClick(currentPage);
  }
});

// Event listener for individual page buttons
const pageButtons = document.querySelectorAll('#pagination button:not(#prevPageBtn, #nextPageBtn)');
pageButtons.forEach((button, index) => {
  button.addEventListener('click', () => handlePageClick(index + 1));
});

// Initial fetch when the page loads
document.addEventListener('DOMContentLoaded', () => {
  fetchAndDisplayRepositories(username, currentPage);
  updatePaginationButtons();
});
