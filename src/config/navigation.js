/**
 * Single source of truth for application routing architecture.
 * Roles mapping arrays dictate structural access across views and guards.
 */

import ShortlistManager from '../pages/ShortlistManager'; // Adjust this import path to match your folder structure

export const ROUTES = {
  // Public Routing Enclaves
  HOME: '/',
  ABOUT: '/about',
  HONOREE: '/honoree/:id',
  AUTH: '/auth',
  CLAIM_REWARD: '/claim-reward',

  // Secured Dashboard Workflow Nodes
  DASHBOARD: '/reward', 
  VOTE: '/vote',
  LEADERBOARD: '/leaderboard',
  
  // Administrative Operations Channels
  ADMIN_SHORTLIST: '/admin/shortlist-manager',
  ADMIN_STANDINGS: '/admin/standings',
  ELECTION_CYCLE: '/electioncycle',
};

export const sidebarNavigation = [
  { name: 'Dashboard Home', path: ROUTES.DASHBOARD, icon: '📊', roles: ['user', 'admin'] },
  { name: 'Live Voting Ballot', path: ROUTES.VOTE, icon: '🗳️', roles: ['user', 'admin'] },
  { name: 'Results Leaderboard', path: ROUTES.LEADERBOARD, icon: '🏆', roles: ['user', 'admin'] },
  
  // Only ONE admin entry for the curation manager here:
  { name: 'Shortlist Queue', path: ROUTES.ADMIN_SHORTLIST, icon: '📋', component: ShortlistManager, roles: ['admin'] },
  
  { name: 'Admin Standings', path: ROUTES.ADMIN_STANDINGS, icon: '📈', roles: ['admin'] },
  { name: 'Election Cycle Manager', path: ROUTES.ELECTION_CYCLE, icon: '⚙️', roles: ['admin'] },
];