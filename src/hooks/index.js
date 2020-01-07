import { useState, useEffect } from "react"
import moment from "moment"
import { firebase } from "../firebase"
import { collatedTasksExist } from "../helpers"

export const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([])
  const [archivedTasks, setArchivedTasks] = useState([])

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("tasks")
      .where("userId", "==", "431f8be5568b6205a27c")

    unsubscribe =
      selectedProject && !collatedTasksExist(selectedProject)
        ? unsubscribe.where("projectId", "==", selectedProject)
        : selectedProject === "TODAY"
        ? unsubscribe.where("date", "==", moment().format("DD/MM/YYYY"))
        : selectedProject === "INBOX" || selectedProject === 0
        ? unsubscribe.where("date", "==", "")
        : unsubscribe

    unsubscribe = unsubscribe.onSnapshot(snapshot => {
      const newTasks = snapshot.docs.map(task => ({
        id: task.id,
        ...task.data()
      }))

      setTasks(
        selectedProject === "NEXT_7"
          ? newTasks.filter(
              task =>
                moment(task.date, "DD-MM-YYYY").diff(moment(), "days") <= 7 &&
                task.archived !== true
            )
          : newTasks.filter(task => task.archived !== true)
      )

      setArchivedTasks(newTasks.filter(task => task.archived !== false))
    })

    return () => unsubscribe()
  }, [selectedProject])

  return [tasks, archivedTasks]
}

export const useProjects = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    firebase
      .firestore()
      .collection("projects")
      .where("userId", "==", "431f8be5568b6205a27c")
      .orderBy("projectId")
      .get()
      .then(snapshot => {
        const allProject = snapshot.docs.map(project => ({
          ...project.data(),
          docId: project.id
        }))

        if (JSON.stringify(allProject) !== JSON.stringify(projects)) {
          setProjects(allProject)
        }
      })
  }, [projects])

  return [projects, setProjects]
}
