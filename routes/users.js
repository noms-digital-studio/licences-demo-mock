const express = require('express');
const jwtDecode = require('jwt-decode');
const router = express.Router();
const profiles = {
  CA: {
    "firstName": "Catherine",
    "lastName": "Amos",
    "staffId": "100",
    "email": "CA-DEMO@work",
    "activeCaseLoadId": "BEL",
  },
  RO: {
    "firstName": "Ryan",
    "lastName": "Orton",
    "staffId": "1",
    "email": "RO_USER@work",
    "activeCaseLoadId": "BEL",
  },
  DM: {
    "firstName": "Diane",
    "lastName": "Matthews",
    "staffId": "3",
    "email": "DM_USER@work",
    "activeCaseLoadId": "BEL",
  }
};

const roles = {
  CA: {
    "roleId": 0,
    "roleName": "string",
    "roleCode": "LEI_LICENCE_CA",
    "parentRoleCode": "string",
  },
  RO: {
    "roleId": 0,
    "roleName": "string",
    "roleCode": "LEI_LICENCE_RO",
    "parentRoleCode": "string",
  },
  DM: {
    "roleId": 0,
    "roleName": "string",
    "roleCode": "LEI_LICENCE_DM",
    "parentRoleCode": "string",
  },
};

router.get('/me', function(req, res) {
  const profile = getProfile(req.headers.authorization);
  res.send(profile)
});

router.get('/me/roles', function(req, res) {
  const role = getRoleCode(req.headers.authorization);
  res.send(role)
});

router.get('/me/caseLoads', function(req, res) {
  res.send([
    {
      "caseLoadId": "DEF",
      "description": "Askham Grange",
      "type": "string",
      "caseloadFunction": "string"
    },
    {
      "caseLoadId": "BEL",
      "description": "Belmarsh",
      "type": "string",
      "caseloadFunction": "string"
    }
  ])
});

function getProfile(token) {
  return findFirstFromToken(token, profiles);
}

function getRoleCode(token) {
  const roleCode = findFirstFromToken(token, roles);
  return roleCode ? [roleCode] : [];
}

function findFirstFromToken(token, roleHash) {
  // Authorization expected to be of form 'Bearer x'
  const accessToken = token.split(' ')[1];
  try {
    // try for a real jwt to get the roles from
    const jwt = jwtDecode(accessToken);
    const lookup = jwt.user_name.substring(0, 2);
    return roleHash[lookup];
  } catch (error) {
    // otherwise fallback to a ca_token, ro_token, dm_token
    const lookup = accessToken.substring(0, 2);
    return roleHash[lookup];
  }
}

module.exports = router;
