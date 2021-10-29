import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import {
  getSquadRoles,
  getSquadPermissions,
  getSquadAndTribe,
} from "../../services/squads";

import { getRoles } from "../../services/roles";

import NavBar from "../../components/Navbar";

import SquadRoleList from "./components/SquadRoleList";
import PageHeader from "./PageHeader";
import SquadEdit from "./SquadEdit";

const SquadDetail = () => {
  const { id } = useParams();

  const [squad, setSquad] = useState({ name: "" });
  const [squadLoading, setSquadLoading] = useState(true);
  const [squadError, setSquadError] = useState(false);

  const [squadRoles, setSquadRoles] = useState([]);
  const [squadRolesLoading, setSquadRolesLoading] = useState(true);
  const [squadRolesError, setSquadRolesError] = useState(false);

  const [squadPermissions, setSquadPermissions] = useState([]);
  const [squadPermissionsLoading, setSquadPermissionsLoading] = useState(true);
  const [squadPermissionsError, setSquadPermissionsError] = useState(false);

  const [roles, setRoles] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [rolesError, setRolesError] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({ name: "" });

  const handleEditOpen = () => {
    setEditOpen(true);
    setEditData({ id, name: squad.name });
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  useEffect(() => {
    getSquadAndTribe({
      id,
      setSquadAndTribe: setSquad,
      setLoading: setSquadLoading,
      setError: setSquadError,
    });
    getSquadRoles({
      id,
      setSquadUsers: setSquadRoles,
      setLoading: setSquadRolesLoading,
      setError: setSquadRolesError,
    });
    getSquadPermissions({
      id,
      setSquadPermissions,
      setLoading: setSquadPermissionsLoading,
      setError: setSquadPermissionsError,
    });
    getRoles({
      setRoles,
      setLoading: setRolesLoading,
      setError: setRolesError,
    }); // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavBar />
      {/* Main */}
      <main>
        <PageHeader
          squad={squad}
          loading={squadLoading}
          error={squadError}
          handleEditOpen={handleEditOpen}
        />
        <Grid container spacing={2}>
          <Grid item xl={6} lg={6}>
            <SquadRoleList
              squadRoles={squadRoles}
              loading={squadRolesLoading}
              error={squadRolesError}
            />
          </Grid>
        </Grid>
      </main>
      {/* End Main */}

      <SquadEdit
        open={editOpen}
        data={editData}
        setData={setEditData}
        squad={squad}
        setSquad={setSquad}
        handleClose={handleEditClose}
      />
    </>
  );
};

export default SquadDetail;
