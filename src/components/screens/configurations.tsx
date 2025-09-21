import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Plus, Edit, Trash2, Save, X, Settings, History, FileText } from "lucide-react";
import { cn } from "../ui/utils";

interface Question {
  id: string;
  text: string;
  type: 'text' | 'multiple_choice' | 'boolean';
  options?: string[];
  required: boolean;
}

interface CategoryFlow {
  id: string;
  name: string;
  description: string;
  questions: Question[];
  version: number;
  lastModified: string;
  status: 'active' | 'draft' | 'archived';
}

const categoryFlows: CategoryFlow[] = [
  {
    id: 'electronics',
    name: 'Electronics Category Flow',
    description: 'Configuration flow for electronics products',
    version: 3,
    lastModified: '2024-09-20',
    status: 'active',
    questions: [
      {
        id: 'brand',
        text: 'What is the product brand?',
        type: 'text',
        required: true
      },
      {
        id: 'warranty',
        text: 'Does this product include warranty?',
        type: 'boolean',
        required: true
      },
      {
        id: 'category',
        text: 'Select product category',
        type: 'multiple_choice',
        options: ['Smartphones', 'Laptops', 'Tablets', 'Accessories'],
        required: true
      }
    ]
  },
  {
    id: 'clothing',
    name: 'Clothing Category Flow',
    description: 'Configuration flow for clothing and apparel',
    version: 2,
    lastModified: '2024-09-18',
    status: 'active',
    questions: [
      {
        id: 'size',
        text: 'Available sizes',
        type: 'multiple_choice',
        options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        required: true
      },
      {
        id: 'material',
        text: 'Primary material',
        type: 'text',
        required: true
      },
      {
        id: 'care',
        text: 'Care instructions',
        type: 'text',
        required: false
      }
    ]
  },
  {
    id: 'footwear',
    name: 'Footwear Category Flow',
    description: 'Configuration flow for shoes and footwear',
    version: 1,
    lastModified: '2024-09-15',
    status: 'draft',
    questions: [
      {
        id: 'size',
        text: 'Shoe sizes available',
        type: 'multiple_choice',
        options: ['6', '7', '8', '9', '10', '11', '12'],
        required: true
      },
      {
        id: 'type',
        text: 'Footwear type',
        type: 'multiple_choice',
        options: ['Sneakers', 'Boots', 'Sandals', 'Formal'],
        required: true
      }
    ]
  }
];

export function Configurations() {
  const [flows, setFlows] = useState<CategoryFlow[]>(categoryFlows);
  const [editingFlow, setEditingFlow] = useState<string | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({});

  const handleSaveFlow = (flowId: string) => {
    setEditingFlow(null);
    // Save logic would go here
  };

  const handleAddQuestion = (flowId: string) => {
    if (newQuestion.text) {
      const question: Question = {
        id: Date.now().toString(),
        text: newQuestion.text,
        type: newQuestion.type || 'text',
        options: newQuestion.options || [],
        required: newQuestion.required || false
      };

      setFlows(prev => prev.map(flow => 
        flow.id === flowId 
          ? { ...flow, questions: [...flow.questions, question] }
          : flow
      ));

      setNewQuestion({});
    }
  };

  const handleDeleteQuestion = (flowId: string, questionId: string) => {
    setFlows(prev => prev.map(flow =>
      flow.id === flowId
        ? { ...flow, questions: flow.questions.filter(q => q.id !== questionId) }
        : flow
    ));
  };

  const handleUpdateQuestion = (flowId: string, questionId: string, updates: Partial<Question>) => {
    setFlows(prev => prev.map(flow =>
      flow.id === flowId
        ? {
            ...flow,
            questions: flow.questions.map(q =>
              q.id === questionId ? { ...q, ...updates } : q
            )
          }
        : flow
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Configurations</h2>
          <p className="text-muted-foreground">Manage category flows, questions, and configuration options</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Category Flow
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Flows</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{flows.length}</div>
            <p className="text-xs text-muted-foreground">Configuration flows</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Flows</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {flows.filter(f => f.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently in use</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {flows.reduce((sum, flow) => sum + flow.questions.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all flows</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Flows */}
      <div className="space-y-6">
        {flows.map((flow) => (
          <Card key={flow.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {flow.name}
                    <Badge 
                      variant={flow.status === 'active' ? 'default' : flow.status === 'draft' ? 'secondary' : 'outline'}
                      className={
                        flow.status === 'active' ? 'bg-green-100 text-green-800' :
                        flow.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {flow.status}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{flow.description}</p>
                  <p className="text-xs text-muted-foreground">
                    Version {flow.version} • Last modified: {flow.lastModified}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEditingFlow(editingFlow === flow.id ? null : flow.id)}
                  >
                    {editingFlow === flow.id ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  </Button>
                  {editingFlow === flow.id && (
                    <Button size="sm" onClick={() => handleSaveFlow(flow.id)}>
                      <Save className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Questions Table */}
              <div className="space-y-4">
                <h4 className="font-medium">Questions & Options</h4>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Question</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Options</TableHead>
                      <TableHead>Required</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {flow.questions.map((question) => (
                      <TableRow key={question.id}>
                        <TableCell>
                          {editingQuestion === question.id ? (
                            <Input
                              value={question.text}
                              onChange={(e) => handleUpdateQuestion(flow.id, question.id, { text: e.target.value })}
                              className="w-full"
                            />
                          ) : (
                            question.text
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {question.type.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {question.options && question.options.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {question.options.slice(0, 3).map((option, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {option}
                                </Badge>
                              ))}
                              {question.options.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{question.options.length - 3} more
                                </Badge>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">N/A</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={question.required}
                            onCheckedChange={(checked) => 
                              handleUpdateQuestion(flow.id, question.id, { required: checked })
                            }
                            disabled={editingFlow !== flow.id}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => 
                                setEditingQuestion(editingQuestion === question.id ? null : question.id)
                              }
                              disabled={editingFlow !== flow.id}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteQuestion(flow.id, question.id)}
                              disabled={editingFlow !== flow.id}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Add New Question */}
                {editingFlow === flow.id && (
                  <Card className="border-dashed">
                    <CardContent className="pt-6">
                      <h5 className="font-medium mb-4">Add New Question</h5>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Question Text</label>
                          <Input
                            placeholder="Enter question text..."
                            value={newQuestion.text || ''}
                            onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Question Type</label>
                            <select 
                              className="w-full p-2 border rounded-md"
                              value={newQuestion.type || 'text'}
                              onChange={(e) => setNewQuestion({ 
                                ...newQuestion, 
                                type: e.target.value as Question['type']
                              })}
                            >
                              <option value="text">Text</option>
                              <option value="multiple_choice">Multiple Choice</option>
                              <option value="boolean">Yes/No</option>
                            </select>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Switch 
                              checked={newQuestion.required || false}
                              onCheckedChange={(checked) => 
                                setNewQuestion({ ...newQuestion, required: checked })
                              }
                            />
                            <label className="text-sm">Required</label>
                          </div>
                        </div>

                        {newQuestion.type === 'multiple_choice' && (
                          <div>
                            <label className="text-sm font-medium">Options (comma-separated)</label>
                            <Textarea
                              placeholder="Option 1, Option 2, Option 3..."
                              value={newQuestion.options?.join(', ') || ''}
                              onChange={(e) => setNewQuestion({ 
                                ...newQuestion, 
                                options: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                              })}
                            />
                          </div>
                        )}

                        <Button onClick={() => handleAddQuestion(flow.id)} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Question
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}