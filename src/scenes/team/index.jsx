import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import axios from "axios";
import Header from "../../components/Header";

const JobsManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [jobs, setJobs] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [newJob, setNewJob] = useState({
    jobTitle: "",
    description: "",
    company_information: "",
    location: "",
    employment_type: "",
    salary_compensation: "",
    requirements: [],
    end_date: "",
  });
  const [jobApplications, setJobApplications] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isJobApplicationsDialogOpen, setIsJobApplicationsDialogOpen] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const response = await axios.get("http://192.168.31.57:10000/jobs");
    const jobsWithId = response.data.map((job, index) => ({ ...job, id: index }));
    setJobs(jobsWithId);
  };

  const handleDelete = async (id) => {
    const jobId = jobs[id]._id;
    await axios.delete(`http://192.168.31.57:10000/jobs/${jobId}`);
    fetchJobs();
  };

  const handleEditSave = async () => {
    if (selectedJob) {
      await axios.put(`http://192.168.31.57:10000/jobs/${selectedJob._id}`, selectedJob);
      fetchJobs();
      setIsEditDialogOpen(false);
    }
  };

  const handleCreateSave = async () => {
    await axios.post("http://192.168.31.57:10000/jobs", newJob);
    fetchJobs();
    setIsCreateDialogOpen(false);
  };

  const fetchJobApplications = async (jobId) => {
    try {
      console.log("Fetching job applications for jobId:", jobId);
      const response = await axios.get(`http://192.168.31.57:10000/job-applications/${jobs[jobId]._id}`);
      console.log("Job applications:", response.data);
      setJobApplications(response.data);
      setIsJobApplicationsDialogOpen(true);
    } catch (error) {
      console.error('Error fetching job applications:', error);
    }
  };


  const columns = [
    {
      field: "applicants",
      headerName: "Applicants",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            variant="outlined"
            size="small"
            onClick={() => fetchJobApplications(params.row.id)}
          >
            Applicants
          </Button>
        );
      },
      width: 100,
    },
    { field: "jobTitle", headerName: "Title", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "company_information", headerName: "Company Info", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "employment_type", headerName: "Employment Type", flex: 1 },
    { field: "salary_compensation", headerName: "Salary", flex: 1 },
    {
      field: "requirements",
      headerName: "Requirements",
      flex: 1,
      renderCell: (params) => {
        return (
          <Typography>{params.value.join(", ")}</Typography>
        );
      },
    },
    {
      field: "end_date",
      headerName: "End Date",
      flex: 1,
      renderCell: (params) => {
        return (
          <Typography>{new Date(params.value).toLocaleString()}</Typography>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              startIcon={<EditOutlinedIcon />}
              onClick={() => {
                setSelectedJob(jobs.find((job) => job.id === params.id));
                setIsEditDialogOpen(true);
              }}
              variant="outlined"
              size="small"
            />
            <Button
              startIcon={<DeleteOutlineOutlinedIcon />}
              onClick={() => handleDelete(params.id)}
              color="error"
              variant="outlined"
              size="small"
            />
          </>
        );
      },
      width: 120,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Job Management" subtitle="Here you can manage your job offers" />
      <Box m="20px">
        <Button
          variant="contained"
          startIcon={<AddOutlinedIcon />}
          onClick={() => setIsCreateDialogOpen(true)}
        >
          Add Job
        </Button>
      </Box>
      <Box
        m="40px 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid
          rows={jobs}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Job</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              margin="dense"
              id="jobTitle"
              label="Job Title"
              type="text"
              fullWidth
              variant="standard"
              value={selectedJob ? selectedJob.jobTitle : ""}
              onChange={(e) => setSelectedJob({ ...selectedJob, jobTitle: e.target.value })}
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={selectedJob ? selectedJob.description : ""}
              onChange={(e) => setSelectedJob({ ...selectedJob, description: e.target.value })}
            />
            <TextField
              margin="dense"
              id="company_information"
              label="Company Information"
              type="text"
              fullWidth
              variant="standard"
              value={selectedJob ? selectedJob.company_information : ""}
              onChange={(e) => setSelectedJob({ ...selectedJob, company_information: e.target.value })}
            />
            <TextField
              margin="dense"
              id="location"
              label="Location"
              type="text"
              fullWidth
              variant="standard"
              value={selectedJob ? selectedJob.location : ""}
              onChange={(e) => setSelectedJob({ ...selectedJob, location: e.target.value })}
            />
            <TextField
              margin="dense"
              id="employment_type"
              label="Employment Type"
              type="text"
              fullWidth
              variant="standard"
              value={selectedJob ? selectedJob.employment_type : ""}
              onChange={(e) => setSelectedJob({ ...selectedJob, employment_type: e.target.value })}
            />
            <TextField
              margin="dense"
              id="salary_compensation"
              label="Salary"
              type="text"
              fullWidth
              variant="standard"
              value={selectedJob ? selectedJob.salary_compensation : ""}
              onChange={(e) => setSelectedJob({ ...selectedJob, salary_compensation: e.target.value })}
            />
            <TextField
              margin="dense"
              id="end_date"
              label="End Date"
              type="datetime-local"
              fullWidth
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              value={selectedJob ? selectedJob.end_date : ""}
              onChange={(e) => setSelectedJob({ ...selectedJob, end_date: e.target.value })}
            />

            {/* Dynamic input fields for requirements */}
            {selectedJob &&
              selectedJob.requirements.map((requirement, index) => (
                <TextField
                  key={index}
                  margin="dense"
                  label={`Requirement ${index + 1}`}
                  type="text"
                  fullWidth
                  variant="standard"
                  value={requirement}
                  onChange={(e) => {
                    const updatedRequirements = [...selectedJob.requirements];
                    updatedRequirements[index] = e.target.value;
                    setSelectedJob({ ...selectedJob, requirements: updatedRequirements });
                  }}
                />
              ))}
            <Button
              onClick={() => setSelectedJob({ ...selectedJob, requirements: [...selectedJob.requirements, ""] })}
              variant="outlined"
            >
              Add Requirement
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
        {/* Button to attach quiz */}
        <Button onClick={() => alert("Attach Quiz button clicked!")} variant="outlined">
          Attach Quiz
        </Button>
      </Dialog>
      <Dialog open={isCreateDialogOpen} onClose={() => setIsCreateDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create New Job</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              margin="dense"
              id="jobTitle"
              label="Job Title"
              type="text"
              fullWidth
              variant="standard"
              value={newJob.jobTitle}
              onChange={(e) => setNewJob({ ...newJob, jobTitle: e.target.value })}
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={newJob.description}
              onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
            />
            <TextField
              margin="dense"
              id="company_information"
              label="Company Information"
              type="text"
              fullWidth
              variant="standard"
              value={newJob.company_information}
              onChange={(e) => setNewJob({ ...newJob, company_information: e.target.value })}
            />
            <TextField
              margin="dense"
              id="location"
              label="Location"
              type="text"
              fullWidth
              variant="standard"
              value={newJob.location}
              onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
            />
            <TextField
              margin="dense"
              id="employment_type"
              label="Employment Type"
              type="text"
              fullWidth
              variant="standard"
              value={newJob.employment_type}
              onChange={(e) => setNewJob({ ...newJob, employment_type: e.target.value })}
            />
            <TextField
              margin="dense"
              id="salary_compensation"
              label="Salary"
              type="text"
              fullWidth
              variant="standard"
              value={newJob.salary_compensation}
              onChange={(e) => setNewJob({ ...newJob, salary_compensation: e.target.value })}
            />
            {newJob.requirements.map((requirement, index) => (
              <TextField
                key={index}
                margin="dense"
                label={`Requirement ${index + 1}`}
                type="text"
                fullWidth
                variant="standard"
                value={requirement}
                onChange={(e) => {
                  const updatedRequirements = [...newJob.requirements];
                  updatedRequirements[index] = e.target.value;
                  setNewJob({ ...newJob, requirements: updatedRequirements });
                }}
              />
            ))}
            <Button
              onClick={() => setNewJob({ ...newJob, requirements: [...newJob.requirements, ""] })}
              variant="outlined"
            >
              Add Requirement
            </Button>
          </Stack>
          <TextField
            margin="dense"
            id="end_date"
            label="End Date"
            type="datetime-local"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            value={newJob.end_date}
            onChange={(e) => setNewJob({ ...newJob, end_date: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreateDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleCreateSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
        {/* Button to attach quiz */}
        <Button onClick={() => alert("Attach Quiz button clicked!")} variant="outlined">
          Attach Quiz
        </Button>
      </Dialog>
      {/* Dialog to display job applications */}
      <Dialog open={isJobApplicationsDialogOpen} onClose={() => setIsJobApplicationsDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Job Applications</DialogTitle>
        <DialogContent>
          {/* Render job applications data here */}
          {jobApplications.map(application => (
            <div key={application._id.$oid}>
              <Typography>Applicant ID: {application.userID}</Typography>
              {/* Render other application details as needed */}
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsJobApplicationsDialogOpen(false)} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JobsManagement;