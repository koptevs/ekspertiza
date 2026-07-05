import { relations } from 'drizzle-orm/relations';
import {
    inspections,
    lifts,
    modelHasPermissions,
    modelHasRoles,
    permissions,
    roleHasPermissions,
    roles,
} from './schema';

export const inspectionsRelations = relations(inspections, ({ one }) => ({
    lift: one(lifts, {
        fields: [inspections.liftId],
        references: [lifts.id],
    }),
}));

export const liftsRelations = relations(lifts, ({ many }) => ({
    inspections: many(inspections),
}));

export const modelHasPermissionsRelations = relations(
    modelHasPermissions,
    ({ one }) => ({
        permission: one(permissions, {
            fields: [modelHasPermissions.permissionId],
            references: [permissions.id],
        }),
    })
);

export const permissionsRelations = relations(permissions, ({ many }) => ({
    modelHasPermissions: many(modelHasPermissions),
    roleHasPermissions: many(roleHasPermissions),
}));

export const modelHasRolesRelations = relations(modelHasRoles, ({ one }) => ({
    role: one(roles, {
        fields: [modelHasRoles.roleId],
        references: [roles.id],
    }),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
    modelHasRoles: many(modelHasRoles),
    roleHasPermissions: many(roleHasPermissions),
}));

export const roleHasPermissionsRelations = relations(
    roleHasPermissions,
    ({ one }) => ({
        permission: one(permissions, {
            fields: [roleHasPermissions.permissionId],
            references: [permissions.id],
        }),
        role: one(roles, {
            fields: [roleHasPermissions.roleId],
            references: [roles.id],
        }),
    })
);
