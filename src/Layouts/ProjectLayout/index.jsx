import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import AvatarMenu from "./AvatarMenu";
import Drawer from "./Drawer";
import { useRouter } from "next/router";
import { useOrganization } from "../../OrganizationContext";
import { useProject } from "../../ProjectContext";
import { Skeleton } from "@material-ui/lab";
import { useSession } from "next-auth/client";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#333",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ProjectLayout({ children }) {
  const [session, loading] = useSession();
  const router = useRouter();
  const [org] = useOrganization(router.query.oid);
  const [project] = useProject(router.query.oid, router.query.pid);
  const classes = useStyles();

  return session ? (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Button variant="text" onClick={() => router.push("/")}>
              Annotator
            </Button>
            &nbsp;/&nbsp;
            <Button
              variant="text"
              onClick={() => router.push(`/${org?._id}`)}
              disabled={!org}
            >
              {org?.name ? org.name : <Skeleton width={100} />}
            </Button>
            &nbsp;/&nbsp;
            <Button
              variant="text"
              onClick={() => router.push(`/${project?._id}`)}
              disabled={!project}
            >
              {project?.name ? project.name : <Skeleton width={100} />}
            </Button>
          </Typography>
          <AvatarMenu />
        </Toolbar>
      </AppBar>
      <Drawer />
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
    </div>
  ) : loading ? null : (
    router.push("/router")
  );
}
