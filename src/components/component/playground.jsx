import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Playground() {
    return (
        (<div className="flex flex-col h-screen">
            <header
                className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ClipboardListIcon className="w-6 h-6" />
                    <h1 className="text-2xl font-bold"> PalatePath</h1>
                </div>
                <Button className="text-white hover:bg-white" size="icon" variant="ghost">
                    <PlusIcon className="w-5 h-5" />
                    <span className="sr-only">Add Task</span>
                </Button>
            </header>

            <main className="flex-1 bg-gray-100 dark:bg-gray-900 p-6 grid gap-6">
                <Tabs defaultValue="all">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">

                            <TabsList className="flex bg-gray-200 ml-4"
                            >
                                <TabsTrigger value="all" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50">All</TabsTrigger>
                                <TabsTrigger value="todo" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50">To Do</TabsTrigger>
                                <TabsTrigger value="inprogress" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50">In Progress</TabsTrigger>
                                <TabsTrigger value="done" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50">Done</TabsTrigger>
                            </TabsList>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                size="icon"
                                variant="ghost">
                                <CalendarIcon className="w-5 h-5" />
                                <span className="sr-only">Calendar</span>
                            </Button>
                            <Button
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                size="icon"
                                variant="ghost">
                                <SearchIcon className="w-5 h-5" />
                                <span className="sr-only">Search</span>
                            </Button>
                        </div>
                    </div>
                    <TabsContent value="all" className="mt-6 mb-2">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                            <Card>
                                <CardHeader>
                                    <CardTitle>Finish wireframes for new homepage</CardTitle>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Due: May 15, 2023</div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-yellow-500" />
                                        <span className="text-sm font-medium">In Progress</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-end gap-2">
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <CheckIcon className="w-5 h-5" />
                                        <span className="sr-only">Mark as Done</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <DeleteIcon className="w-5 h-5" />
                                        <span className="sr-only">Edit Task</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <TrashIcon className="w-5 h-5" />
                                        <span className="sr-only">Delete Task</span>
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Implement new design system</CardTitle>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Due: June 1, 2023</div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500" />
                                        <span className="text-sm font-medium">Done</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-end gap-2">
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <CheckIcon className="w-5 h-5" />
                                        <span className="sr-only">Mark as Done</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <DeleteIcon className="w-5 h-5" />
                                        <span className="sr-only">Edit Task</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <TrashIcon className="w-5 h-5" />
                                        <span className="sr-only">Delete Task</span>
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Write blog post on Tailwind CSS</CardTitle>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Due: May 30, 2023</div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-red-500" />
                                        <span className="text-sm font-medium">To Do</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-end gap-2">
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <CheckIcon className="w-5 h-5" />
                                        <span className="sr-only">Mark as Done</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <DeleteIcon className="w-5 h-5" />
                                        <span className="sr-only">Edit Task</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <TrashIcon className="w-5 h-5" />
                                        <span className="sr-only">Delete Task</span>
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Refactor API endpoints</CardTitle>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Due: June 15, 2023</div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-yellow-500" />
                                        <span className="text-sm font-medium">In Progress</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-end gap-2">
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <CheckIcon className="w-5 h-5" />
                                        <span className="sr-only">Mark as Done</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <DeleteIcon className="w-5 h-5" />
                                        <span className="sr-only">Edit Task</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <TrashIcon className="w-5 h-5" />
                                        <span className="sr-only">Delete Task</span>
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Finish wireframes for new homepage</CardTitle>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Due: May 15, 2023</div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-yellow-500" />
                                        <span className="text-sm font-medium">In Progress</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-end gap-2">
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <CheckIcon className="w-5 h-5" />
                                        <span className="sr-only">Mark as Done</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <DeleteIcon className="w-5 h-5" />
                                        <span className="sr-only">Edit Task</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <TrashIcon className="w-5 h-5" />
                                        <span className="sr-only">Delete Task</span>
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Implement new design system</CardTitle>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Due: June 1, 2023</div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500" />
                                        <span className="text-sm font-medium">Done</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-end gap-2">
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <CheckIcon className="w-5 h-5" />
                                        <span className="sr-only">Mark as Done</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <DeleteIcon className="w-5 h-5" />
                                        <span className="sr-only">Edit Task</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <TrashIcon className="w-5 h-5" />
                                        <span className="sr-only">Delete Task</span>
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Write blog post on Tailwind CSS</CardTitle>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Due: May 30, 2023</div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-red-500" />
                                        <span className="text-sm font-medium">To Do</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-end gap-2">
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <CheckIcon className="w-5 h-5" />
                                        <span className="sr-only">Mark as Done</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <DeleteIcon className="w-5 h-5" />
                                        <span className="sr-only">Edit Task</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <TrashIcon className="w-5 h-5" />
                                        <span className="sr-only">Delete Task</span>
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Refactor API endpoints</CardTitle>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Due: June 15, 2023</div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-yellow-500" />
                                        <span className="text-sm font-medium">In Progress</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-end gap-2">
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <CheckIcon className="w-5 h-5" />
                                        <span className="sr-only">Mark as Done</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <DeleteIcon className="w-5 h-5" />
                                        <span className="sr-only">Edit Task</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <TrashIcon className="w-5 h-5" />
                                        <span className="sr-only">Delete Task</span>
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Finish wireframes for new homepage</CardTitle>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Due: May 15, 2023</div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-yellow-500" />
                                        <span className="text-sm font-medium">In Progress</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-end gap-2">
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <CheckIcon className="w-5 h-5" />
                                        <span className="sr-only">Mark as Done</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <DeleteIcon className="w-5 h-5" />
                                        <span className="sr-only">Edit Task</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <TrashIcon className="w-5 h-5" />
                                        <span className="sr-only">Delete Task</span>
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Implement new design system</CardTitle>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Due: June 1, 2023</div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500" />
                                        <span className="text-sm font-medium">Done</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-end gap-2">
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <CheckIcon className="w-5 h-5" />
                                        <span className="sr-only">Mark as Done</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <DeleteIcon className="w-5 h-5" />
                                        <span className="sr-only">Edit Task</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <TrashIcon className="w-5 h-5" />
                                        <span className="sr-only">Delete Task</span>
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Write blog post on Tailwind CSS</CardTitle>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Due: May 30, 2023</div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-red-500" />
                                        <span className="text-sm font-medium">To Do</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-end gap-2">
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <CheckIcon className="w-5 h-5" />
                                        <span className="sr-only">Mark as Done</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <DeleteIcon className="w-5 h-5" />
                                        <span className="sr-only">Edit Task</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <TrashIcon className="w-5 h-5" />
                                        <span className="sr-only">Delete Task</span>
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Refactor API endpoints</CardTitle>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Due: June 15, 2023</div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-yellow-500" />
                                        <span className="text-sm font-medium">In Progress</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-end gap-2">
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <CheckIcon className="w-5 h-5" />
                                        <span className="sr-only">Mark as Done</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <DeleteIcon className="w-5 h-5" />
                                        <span className="sr-only">Edit Task</span>
                                    </Button>
                                    <Button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost">
                                        <TrashIcon className="w-5 h-5" />
                                        <span className="sr-only">Delete Task</span>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </main >
        </div >)
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
