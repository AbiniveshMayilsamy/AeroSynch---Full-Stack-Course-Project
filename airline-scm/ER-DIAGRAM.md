# ER Diagram - Airline SCM System

```mermaid
erDiagram
    USER ||--o{ INVENTORY : manages
    SUPPLIER ||--o{ INVENTORY : supplies
    
    USER {
        ObjectId _id PK
        String firstName
        String lastName
        String email UK
        String password
        String role
        String department
        Boolean isActive
        DateTime createdAt
        DateTime updatedAt
    }
    
    INVENTORY {
        ObjectId _id PK
        String partNumber UK
        String name
        String category
        Number quantity
        Number minStock
        Number unitPrice
        ObjectId supplier FK
        String location
        String status
        DateTime createdAt
        DateTime updatedAt
    }
    
    SUPPLIER {
        ObjectId _id PK
        String name
        String contactPerson
        String email
        String phone
        String address
        String status
        DateTime createdAt
        DateTime updatedAt
    }
```

## Entity Descriptions

### USER
- Manages system users with role-based access (admin, manager, employee)
- Tracks user authentication and department assignment

### INVENTORY
- Stores aircraft parts and supplies information
- Categories: engine, avionics, hydraulics, electrical, structural, consumables
- Auto-updates status based on quantity thresholds

### SUPPLIER
- Maintains supplier information for inventory procurement
- Links to inventory items for supply chain tracking

## Relationships
- **USER manages INVENTORY**: One-to-Many (users can manage multiple inventory items)
- **SUPPLIER supplies INVENTORY**: One-to-Many (suppliers can supply multiple inventory items)
