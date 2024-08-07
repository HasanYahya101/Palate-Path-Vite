import { Button } from "@/components/ui/button";
import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from 'react';
import { Database } from '@sqlitecloud/drivers';
import { Calendar as CalendarIcon_ } from "lucide-react";
import { format, set } from "date-fns";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from '../ui/calendar';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import Filter from 'bad-words';

let db = 'trmjufdmpve;00vtfs;23456789:Adz6ijvgzt{/trmjuf/dmpve;99710qbmbufqbui/ec';
let new_db = db.split('').map((char) => String.fromCharCode(char.charCodeAt(0) - 1)).join('');
let database = new Database(new_db);

export function Playground() {

    const { toast } = useToast();

    const [change, setChange] = useState(false);

    const [doneTasks, setDoneTasks] = useState([]);

    const [allTasks, setAllTasks] = useState([]);

    const [todoTasks, setTodoTasks] = useState([]);

    const [inProgressTasks, setInProgressTasks] = useState([]);

    async function checkToDo(id) {
        let todoData = await database.sql(`UPDATE data SET status = "inprogress" WHERE status = "todo" AND id = ${id};`);
        toast(
            {
                title: "Success",
                description: "Task moved to In Progress.",
                variant: "success",
            }
        );
        switchChange();
    }

    async function checkInprog(id) {
        let inProgressData = await database.sql(`UPDATE data SET status = "done" WHERE status = "inprogress" AND id = ${id};`);
        toast(
            {
                title: "Success",
                description: "Task marked as Done.",
                variant: "success",
            }
        );
        switchChange();
    }

    // async function get data
    async function fetchDoneData() {
        let doneData = await database.sql('SELECT * FROM data WHERE status = "done";');
        // set data to state
        setDoneTasks(doneData);
    }

    async function fetchAllData() {
        let allData = await database.sql('SELECT * FROM data;');
        // set data to state
        setAllTasks(allData);
    }

    async function fetchTodoData() {
        let todoData = await database.sql('SELECT * FROM data WHERE status = "todo";');
        // set data to state
        setTodoTasks(todoData);
    }

    async function fetchinProgressData() {
        let inProgressData = await database.sql('SELECT * FROM data WHERE status = "inprogress";');
        // set data to state
        setInProgressTasks(inProgressData);
    }

    async function switchChange() {
        change ? setChange(false) : setChange(true);
    }

    async function delTask(status, id) {
        let delData = await database.sql(`DELETE FROM data WHERE status = '${status}' AND id = ${id} AND EXISTS (SELECT 1 FROM data WHERE status = '${status}' AND id = ${id});`);
        switchChange();
        toast(
            {
                title: "Success",
                description: "Task deleted successfully.",
                variant: "success",
            }
        );
    }

    useEffect(() => {
        fetchDoneData();
        fetchAllData();
        fetchTodoData();
        fetchinProgressData();
    }, [change]);

    async function cleanDB() {
        // check if there are 1000 or more rows in database table data, if yes delete the oldest 500 rows
        let query = `SELECT COUNT(*) FROM data;`
        let count = await database.sql(query);
        let row_0 = count[0];
        let COUNT = row_0["COUNT(*)"];

        if (COUNT >= 1000) {
            let query = `DELETE FROM data WHERE id IN (SELECT id FROM data ORDER BY id ASC LIMIT 500);`
            let deleteData = await database.sql(query);
        }
        return;
    }

    useEffect(() => {
        cleanDB();
    }, []);

    return (
        (<div className="flex flex-col h-screen w-full max-w-[100vw] min-w-[calc(100vw-30px)]"
        >
            <header
                className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between max-w-[100vw] min-w-[calc(100vw-30px)]">
                <div className="flex items-center gap-2">
                    <ClipboardListIcon className="w-6 h-6" />
                    <h1 className="text-2xl font-bold"> PalatePath</h1>
                </div>
                <AddTask change={change} setChange={setChange}
                />
            </header>

            <main className="bg-gray-100 dark:bg-gray-900 p-6 grid gap-6 max-w-[100vw] min-w-[calc(100vw-30px)] flex-1">
                <Tabs defaultValue="all" className="flex-1 flex-wrap">
                    <div className="flex items-center justify-between w-full ml-3 mr-3">
                        <div className="flex items-center gap-4">

                            <TabsList className="flex bg-gray-200 ml-4 mr-4 rounded-lg overflow-hidden"
                            >
                                <TabsTrigger value="all" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50">All</TabsTrigger>
                                <TabsTrigger value="todo" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50">To Do</TabsTrigger>
                                <TabsTrigger value="inprogress" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50">In Progress</TabsTrigger>
                                <TabsTrigger value="done" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50">Done</TabsTrigger>
                            </TabsList>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mr-6">

                            <ApplyDateFilter setDoneTasks={setDoneTasks} setAllTasks={setAllTasks} setTodoTasks={setTodoTasks} setInProgressTasks={setInProgressTasks}
                            />
                            <ApplySearchFilter setDoneTasks={setDoneTasks} setAllTasks={setAllTasks} setTodoTasks={setTodoTasks} setInProgressTasks={setInProgressTasks}
                            />
                        </div>
                    </div>
                    <TabsContent value="all" className="mt-6 mb-2">
                        {allTasks === null || allTasks.length === 0 || allTasks.size === 0 ? (
                            <Card className="border border-dashed shadow-sm rounded-lg flex items-center justify-center p-2 h-[66vh] w-full max-w-[96vw] mx-auto">
                                <div className="flex flex-col items-center gap-4">
                                    <NotFoundIcon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                                    <h3 className="font-bold text-2xl tracking-tight mt-2">No Tasks Found</h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Please add a task to see it here.
                                    </p>
                                </div>
                            </Card>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {allTasks.map((task) => (
                                    <Card className="flex flex-col justify-between h-full">
                                        <CardHeader>
                                            <CardTitle>{task.description}</CardTitle>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">Due: {task.month_} {task.date_}, {task.year_}</div>
                                        </CardHeader>
                                        <CardContent className="justify-between h-full">
                                            {task.status === "todo" ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                                                    <span className="text-sm font-medium">To Do</span>
                                                </div>
                                            ) : task.status === "inprogress" ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="h-2 w-2 rounded-full bg-red-500" />
                                                    <span className="text-sm font-medium">In Progress</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                                    <span className="text-sm font-medium">Done</span>
                                                </div>
                                            )}
                                        </CardContent>
                                        <CardFooter className="mt-auto mb-1 flex items-center justify-end gap-2">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button onClick={() => delTask(task.status, task.id)}
                                                            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                                            size="icon"
                                                            variant="ghost">
                                                            <TrashIcon className="w-5 h-5" />
                                                            <span className="sr-only">Delete Task</span>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <span className="text-sm text-muted-foreground select-none">Delete Task</span>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                    <TabsContent value="todo" className="mt-6 mb-2">
                        {todoTasks.length === 0 || todoTasks.size === 0 || todoTasks === null ? (
                            <Card className="border border-dashed shadow-sm rounded-lg flex items-center justify-center p-2 h-[66vh] w-full max-w-[96vw] mx-auto">
                                <div className="flex flex-col items-center gap-4">
                                    <NotFoundIcon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                                    <h3 className="font-bold text-2xl tracking-tight mt-2">No Tasks Found</h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Please add a task to see it here.
                                    </p>
                                </div>
                            </Card>

                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {todoTasks.map((task) => (
                                    <Card className="flex flex-col justify-between h-full">
                                        <CardHeader>
                                            <CardTitle>{task.description}</CardTitle>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">Due: {task.month_} {task.date_}, {task.year_}</div>
                                        </CardHeader>
                                        <CardContent className="justify-between h-full">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                                                <span className="text-sm font-medium">To Do</span>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="mt-auto mb-1 flex items-center justify-end gap-2">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button onClick={() => checkToDo(task.id)}
                                                            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                                            size="icon"
                                                            variant="ghost">
                                                            <CheckIcon className="w-5 h-5" />
                                                            <span className="sr-only">Mark as Done</span>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <span className="text-sm text-muted-foreground select-none">Mark as Done</span>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            <EditTodo id={task.id} setChange={setChange} change={change}
                                            />
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button onClick={() => delTask(task.status, task.id)}
                                                            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                                            size="icon"
                                                            variant="ghost">
                                                            <TrashIcon className="w-5 h-5" />
                                                            <span className="sr-only">Delete Task</span>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <span className="text-sm text-muted-foreground select-none">Delete Task</span>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                    <TabsContent value="inprogress" className="mt-6 mb-2">
                        {inProgressTasks.length === 0 || inProgressTasks.size === 0 || inProgressTasks === null ? (
                            <Card className="border border-dashed shadow-sm rounded-lg flex items-center justify-center p-2 h-[66vh] w-full max-w-[96vw] mx-auto">
                                <div className="flex flex-col items-center gap-4">
                                    <NotFoundIcon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                                    <h3 className="font-bold text-2xl tracking-tight mt-2">No Tasks Found</h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Please add a task to see it here.
                                    </p>
                                </div>
                            </Card>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {inProgressTasks.map((task) => (
                                    <Card className="flex flex-col justify-between h-full">
                                        <CardHeader>
                                            <CardTitle>{task.description}</CardTitle>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">Due: {task.month_} {task.date_}, {task.year_}</div>
                                        </CardHeader>
                                        <CardContent className="justify-between h-full">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-red-500" />
                                                <span className="text-sm font-medium">In Progress</span>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="mt-auto mb-1 flex items-center justify-end gap-2">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button onClick={() => checkInprog(task.id)}
                                                            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                                            size="icon"
                                                            variant="ghost">
                                                            <CheckIcon className="w-5 h-5" />
                                                            <span className="sr-only">Mark as Done</span>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <span className="text-sm text-muted-foreground select-none">Mark as Done</span>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            <EditTodo id={task.id} setChange={setChange} change={change}
                                            />
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button onClick={() => delTask(task.status, task.id)}
                                                            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                                            size="icon"
                                                            variant="ghost">
                                                            <TrashIcon className="w-5 h-5" />
                                                            <span className="sr-only">Delete Task</span>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <span className="text-sm text-muted-foreground select-none">Delete Task</span>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                    <TabsContent value="done" className="mt-6 mb-2">
                        {doneTasks.length === 0 || doneTasks.size === 0 || doneTasks === null ? (
                            <Card className="border border-dashed shadow-sm rounded-lg flex items-center justify-center p-2 h-[66vh] w-full max-w-[96vw] mx-auto">
                                <div className="flex flex-col items-center gap-4">
                                    <NotFoundIcon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                                    <h3 className="font-bold text-2xl tracking-tight mt-2">No Tasks Found</h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Please add a task to see it here.
                                    </p>
                                </div>
                            </Card>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {doneTasks.map((task) => (
                                    <Card className="flex flex-col justify-between h-full">
                                        <CardHeader>
                                            <CardTitle>{task.description}</CardTitle>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">Due: {task.month_} {task.date_}, {task.year_}</div>
                                        </CardHeader>
                                        <CardContent className="justify-between h-full">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                                <span className="text-sm font-medium">Done</span>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="mt-auto mb-1 flex items-center justify-end gap-2">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button onClick={() => delTask(task.status, task.id)}
                                                            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                                            size="icon"
                                                            variant="ghost">
                                                            <TrashIcon className="w-5 h-5" />
                                                            <span className="sr-only">Delete Task</span>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <span className="text-sm text-muted-foreground select-none">Delete Task</span>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </main >
        </div >)
    );
}

function ApplySearchFilter({ setDoneTasks, setAllTasks, setTodoTasks, setInProgressTasks }) {

    const { toast } = useToast();

    const [isOpen, setIsOpen] = useState(false);

    const [description, setDescription] = useState("");

    const filter = new Filter();

    async function Confirmed() {
        if (filter.isProfane(description)) {
            toast(
                {
                    title: "Error",
                    description: "Please enter a description without any profanity.",
                    variant: "destructive",
                }
            );
            return;
        }
        else if (description.length <= 5) {
            toast(
                {
                    title: "Error",
                    description: "Please enter a description with more than 5 characters.",
                    variant: "destructive",
                }
            );
            return;
        }
        else if (description.length > 50) {
            toast(
                {
                    title: "Error",
                    description: "Please enter a description with less than 51 characters.",
                    variant: "destructive",
                }
            );
            return;
        }
        else if (description === "" || description === null) {
            toast(
                {
                    title: "Error",
                    description: "Please enter a description for the task.",
                    variant: "destructive",
                }
            );
            return;
        }

        let doneData = await database.sql(`SELECT * FROM data WHERE description LIKE '%${description}%' AND status = "done";`);
        setDoneTasks(doneData);

        let allData = await database.sql(`SELECT * FROM data WHERE description LIKE '%${description}%';`);
        setAllTasks(allData);

        let todoData = await database.sql(`SELECT * FROM data WHERE description LIKE '%${description}%' AND status = "todo";`);
        setTodoTasks(todoData);

        let inProgressData = await database.sql(`SELECT * FROM data WHERE description LIKE '%${description}%' AND status = "inprogress";`);
        setInProgressTasks(inProgressData);

        toast(
            {
                title: "Success",
                description: "Search filter applied successfully.",
                variant: "success",
            }
        );

        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} className="w-full max-w-md"
        >
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger>
                            <Button onClick={() => setDescription("")}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                size="icon"
                                variant="ghost">
                                <SearchIcon className="w-5 h-5" />
                                <span className="sr-only">Search</span>
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span className="text-sm text-muted-foreground select-none">Filter by Search</span>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DialogContent>
                <DialogDescription>
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-black font-bold"
                        >Apply Search Filter</DialogTitle>
                        <DialogDescription>
                            Filter tasks based on the description.
                        </DialogDescription>
                    </DialogHeader>
                    <Card className=" flex items-center justify-center mt-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                                    <Input value={description} onChange={(e) => setDescription(e.target.value)}
                                        type="text" placeholder="Enter text here" id="description" name="description" className="mt-2 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div className="flex justify-end gap-4 mt-6">
                                    <Button onClick={() => setIsOpen(false)}
                                        type="button" variant="destructive">Cancel</Button>
                                    <Button onClick={() => Confirmed()}
                                        type="button" variant="default">Apply Filter</Button>
                                </div>
                            </form>
                        </div>
                    </Card>
                </DialogDescription>
            </DialogContent>
        </Dialog>

    );
}

function ApplyDateFilter({ setDoneTasks, setAllTasks, setTodoTasks, setInProgressTasks }) {
    const [isOpen, setIsOpen] = useState(false);

    const [date, setDate] = useState(new Date());

    const { toast } = useToast();

    async function Confirmed() {

        if (date === "" || date === null || date === undefined) {
            toast(
                {
                    title: "Error",
                    description: "Please select a date for the task.",
                    variant: "destructive",
                }
            );
            return;
        }

        let month_ = format(date, "MMM"); // May
        let date_ = format(date, "d"); // 15
        let year_ = format(date, "yyyy"); // 2023

        let doneData = await database.sql(`SELECT * FROM data WHERE month_ = '${month_}' AND date_ = '${date_}' AND year_ = '${year_}' AND status = "done";`);
        setDoneTasks(doneData);

        let allData = await database.sql(`SELECT * FROM data WHERE month_ = '${month_}' AND date_ = '${date_}' AND year_ = '${year_}';`);
        setAllTasks(allData);

        let todoData = await database.sql(`SELECT * FROM data WHERE month_ = '${month_}' AND date_ = '${date_}' AND year_ = '${year_}' AND status = "todo";`);
        setTodoTasks(todoData);

        let inProgressData = await database.sql(`SELECT * FROM data WHERE month_ = '${month_}' AND date_ = '${date_}' AND year_ = '${year_}' AND status = "inprogress";`);
        setInProgressTasks(inProgressData);

        toast(
            {
                title: "Success",
                description: "Date filter applied successfully.",
                variant: "success",
            }
        );

        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} className="w-full max-w-md"
        >
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger>
                            <Button onClick={() => setDate(new Date())}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                size="icon"
                                variant="ghost">
                                <CalendarIcon className="w-5 h-5" />
                                <span className="sr-only">Calendar</span>
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span className="text-sm text-muted-foreground select-none">Filter by Date</span>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DialogContent>
                <DialogDescription>
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-black font-bold"
                        >Apply Date Filter</DialogTitle>
                        <DialogDescription>
                            Filter tasks based on the due date.
                        </DialogDescription>
                    </DialogHeader>
                    <Card className=" flex items-center justify-center mt-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Due Date</label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[280px] justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon_ className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                className="rounded-md border"
                                                selected={date}
                                                onSelect={setDate}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="flex justify-end gap-4 mt-6">
                                    <Button onClick={() => setIsOpen(false)}
                                        type="button" variant="destructive">Cancel</Button>
                                    <Button onClick={() => Confirmed()}
                                        type="button" variant="default">Apply Filter</Button>
                                </div>
                            </form>
                        </div>
                    </Card>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}

function EditTodo({ id, setChange, change }) {
    // this function edits the description of task

    const [isOpen, setIsOpen] = useState(false);

    const { toast } = useToast();

    const [description_, setDescription_] = useState("");


    const filter = new Filter();

    async function Confirmed() {
        if (filter.isProfane(description_)) {
            toast(
                {
                    title: "Error",
                    description: "Please enter a description without any profanity.",
                    variant: "destructive",
                }
            );
            return;
        }
        else if (description_.length <= 5) {
            toast(
                {
                    title: "Error",
                    description: "Please enter a description with more than 5 characters.",
                    variant: "destructive",
                }
            );
            return;
        }
        else if (description_.length > 50) {
            toast(
                {
                    title: "Error",
                    description: "Please enter a description with less than 51 characters.",
                    variant: "destructive",
                }
            );
            return;
        }
        else if (description_ === "" || description_ === null) {
            toast(
                {
                    title: "Error",
                    description: "Please enter a description for the task.",
                    variant: "destructive",
                }
            );
            return;
        }

        let updateData = await database.sql(`UPDATE data SET description = '${description_}' WHERE id = ${id};`);

        setIsOpen(false);


        toast(
            {
                title: "Success",
                description: "Task edited successfully.",
                variant: "success",
            }
        );

        change ? setChange(false) : setChange(true);
        return;
    }

    return (
        (
            <Popover open={isOpen} onOpenChange={setIsOpen} className="w-full max-w-md"
            >
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <PopoverTrigger>
                                <Button onClick={() => setDescription_("")}
                                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                    size="icon"
                                    variant="ghost">
                                    <DeleteIcon className="w-5 h-5" />
                                    <span className="sr-only">Edit Task</span>
                                </Button>
                            </PopoverTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span className="text-sm text-muted-foreground select-none">Edit Task</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <PopoverContent>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-2 w-full max-w-md">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                <Input value={description_} onChange={(e) => setDescription_(e.target.value)}
                                    type="text" placeholder="Enter text here" id="description" name="description" className="mt-2 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <Button onClick={() => Confirmed()}
                                    type="button"
                                    variant="default">
                                    Edit Task
                                </Button>
                            </div>
                        </form>
                    </div>

                </PopoverContent>
            </Popover>
        )
    );
}

function AddTask({ change, setChange }) {
    const [dialogOpen, setDialogOpen] = useState(false);

    const { toast } = useToast();

    const [date, setDate] = useState(new Date());

    const [description, setDescription] = useState("");

    const filter = new Filter();

    async function Confirmed() {
        let month_ = format(date, "MMM"); // May
        let date_ = format(date, "d"); // 15
        let year_ = format(date, "yyyy"); // 2023
        let status = "todo";

        if (filter.isProfane(description)) {
            toast(
                {
                    title: "Error",
                    description: "Please enter a description without any profanity.",
                    variant: "destructive",
                }
            );
            return;
        }
        else if (description.length <= 5) {
            toast(
                {
                    title: "Error",
                    description: "Please enter a description with more than 5 characters.",
                    variant: "destructive",
                }
            );
            return;
        }
        else if (description.length > 50) {
            toast(
                {
                    title: "Error",
                    description: "Please enter a description with less than 51 characters.",
                    variant: "destructive",
                }
            );
            return;
        }
        else if (description === "" || description === null) {
            toast(
                {
                    title: "Error",
                    description: "Please enter a description for the task.",
                    variant: "destructive",
                }
            );
            return;
        }
        else if (date === "" || date === null) {
            toast(
                {
                    title: "Error",
                    description: "Please select a date for the task.",
                    variant: "destructive",
                }
            );
            return;
        }

        let insertData = await database.sql(`INSERT INTO data (description, month_, date_, year_, status) VALUES ('${description}', '${month_}', '${date_}', '${year_}', '${status}');`);


        setDialogOpen(false);

        toast(
            {
                title: "Success",
                description: "Task added successfully.",
                variant: "success",
            }
        );

        change ? setChange(false) : setChange(true);
        return;
    }

    function openedDialog() {
        setDialogOpen(true);
        setDate(new Date());
        setDescription("");
    }

    return (
        (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen} className="w-full max-w-md"
            >
                <Toaster />
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DialogTrigger>
                                <Button onClick={openedDialog}
                                    className="text-white hover:bg-white" size="icon" variant="ghost">
                                    <PlusIcon className="w-5 h-5" />
                                    <span className="sr-only">Add Task</span>
                                </Button>
                            </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span className="text-sm text-muted-foreground select-none">Add Task</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <DialogContent>
                    <DialogDescription>
                        <DialogHeader>
                            <DialogTitle className="text-2xl text-black font-bold"
                            >Add Task</DialogTitle>
                            <DialogDescription>
                                Add a new task to your list. This will help you keep track of what you need to do.
                            </DialogDescription>
                        </DialogHeader>
                        <Card className=" flex items-center justify-center mt-4">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                                <form>
                                    <div className="mb-4">
                                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Due Date</label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[280px] justify-start text-left font-normal",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon_ className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    className="rounded-md border"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                        <Input value={description} onChange={(e) => setDescription(e.target.value)}
                                            type="text" placeholder="Enter text here" id="description" name="description" className="mt-2 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                    <div className="flex justify-end gap-4 mt-6">
                                        <Button onClick={() => setDialogOpen(false)}
                                            type="button" variant="destructive">Cancel</Button>
                                        <Button onClick={Confirmed}
                                            type="button" variant="default">Add Task</Button>
                                    </div>
                                </form>
                            </div>
                        </Card>
                    </DialogDescription>
                </DialogContent>
            </Dialog >
        )
    );
}


function CalendarIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
        </svg>)
    );
}

function CheckIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
        </svg>)
    );
}

function ClipboardListIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            <path
                d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <path d="M12 11h4" />
            <path d="M12 16h4" />
            <path d="M8 11h.01" />
            <path d="M8 16h.01" />
        </svg>)
    );
}

function DeleteIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
            <line x1="18" x2="12" y1="9" y2="15" />
            <line x1="12" x2="18" y1="9" y2="15" />
        </svg>)
    );
}

function NotFoundIcon(props) {
    return (
        <svg
            {...props}
            width="800" height="800" viewBox="0 0 14 14"
            xmlns="http://www.w3.org/2000/svg" >
            <path d="M7 14A7 7 0 1 1 7 0a7 7 0 0 1 0 14z" />
            <path d="M7 13A6 6 0 1 0 7 1a6 6 0 0 0 0 12z" fill="#FFF" style={{ fill: 'var(--svg-status-bg, #fff)' }} fillRule="nonzero" />
            <path d="M8.16 7.184c.519-.37.904-.857 1.07-1.477.384-1.427-.619-2.897-2.246-2.897-.732 0-1.327.26-1.766.692a2.163 2.163 0 0 0-.509.743.75.75 0 0 0 1.4.54.78.78 0 0 1 .16-.213c.168-.165.39-.262.715-.262.597 0 .936.496.798 1.007-.067.249-.235.462-.492.644-.231.165-.47.264-.601.3a.75.75 0 0 0-.556.724v1.421a.75.75 0 0 0 1.5 0v-.909c.168-.082.346-.185.526-.313z" fillRule="nonzero" />
            <ellipse cx="6.889" cy="10.634" rx="1" ry="1" />
        </svg>
    );
}



function PlusIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>)
    );
}

function SearchIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>)
    );
}

function TrashIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>)
    );
}