import React, { useEffect, useState } from "react";

const SquadRoleForm = (props) => {

  const { addSquadRoleVisible, setAddSquadRoleVisible, roles } = props;


  if (addSquadRoleVisible) {
    return (
      <>
        <div
          className={`backdrop${addSquadRoleVisible ? " visible" : ""} right`}
          onMouseUp={() => setAddSquadRoleVisible(false)}
        >
          <div
            className="bg-white hv-100 flex flex-col"
            onMouseUp={(e) => e.stopPropagation()}
          >
            <div className="py-5 px-3">
              <h3>Adicionar Membro</h3>
              <div>
                <input type="text" placeholder="Email, usuário..." />
                <div className="my-2 flex flex-col">
                  <label htmlFor="">Roles</label>
                  <div>
                    {roles.length > 0
                      ? roles.map((role) => {
                          return (
                            <div key={role.id}>
                              <input type="checkbox" id={role.id} />
                              <label className="ml-1" htmlFor={role.id}>
                                {role.name}
                              </label>
                            </div>
                          );
                        })
                      : null}
                  </div>
                </div>

                <button className="w-100">Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return null;
};
